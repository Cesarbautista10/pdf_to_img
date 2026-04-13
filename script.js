// Configurar PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

// Variables globales
let currentPdfDoc = null;
let convertedImages = [];

// Elementos del DOM
const pdfInput = document.getElementById('pdfInput');
const uploadBox = document.querySelector('.upload-box');
const optionsSection = document.getElementById('optionsSection');
const progressSection = document.getElementById('progressSection');
const resultsSection = document.getElementById('resultsSection');
const errorMsg = document.getElementById('errorMsg');
const qualitySelect = document.getElementById('quality');
const pageRangeSelect = document.getElementById('pageRange');
const customPagesInput = document.getElementById('customPages');
const convertBtn = document.getElementById('convertBtn');
const downloadBtn = document.getElementById('downloadBtn');
const resetBtn = document.getElementById('resetBtn');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const gallery = document.getElementById('gallery');

// Event Listeners
pdfInput.addEventListener('change', handleFileSelect);
uploadBox.addEventListener('dragover', handleDragOver);
uploadBox.addEventListener('dragleave', handleDragLeave);
uploadBox.addEventListener('drop', handleDrop);
pageRangeSelect.addEventListener('change', handlePageRangeChange);
convertBtn.addEventListener('click', convertPdf);
downloadBtn.addEventListener('click', downloadAllImages);
resetBtn.addEventListener('click', resetApp);

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        processFile(file);
    }
}

function handleDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    uploadBox.classList.add('dragover');
}

function handleDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
    uploadBox.classList.remove('dragover');
}

function handleDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    uploadBox.classList.remove('dragover');
    
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        const file = files[0];
        if (file.type === 'application/pdf') {
            pdfInput.files = files;
            processFile(file);
        } else {
            showError('⚠️ Por favor, carga un archivo PDF válido.');
        }
    }
}

function handlePageRangeChange() {
    if (pageRangeSelect.value === 'custom') {
        customPagesInput.style.display = 'block';
    } else {
        customPagesInput.style.display = 'none';
    }
}

async function processFile(file) {
    // Validar tamaño
    if (file.size > 52428800) { // 50 MB
        showError('⚠️ El archivo es muy grande. Máximo 50 MB.');
        return;
    }

    errorMsg.style.display = 'none';
    hideAllSections();

    const reader = new FileReader();
    reader.onload = async (e) => {
        try {
            currentPdfDoc = await pdfjsLib.getDocument(e.target.result).promise;
            optionsSection.style.display = 'block';
            uploadBox.innerHTML = `
                <span class="upload-icon">✅</span>
                <p>${file.name}</p>
                <span class="file-info">${currentPdfDoc.numPages} página${currentPdfDoc.numPages > 1 ? 's' : ''}</span>
            `;
        } catch (error) {
            showError('⚠️ Error al cargar el PDF. Intenta con otro archivo.');
            console.error('Error PDF:', error);
        }
    };
    reader.readAsArrayBuffer(file);
}

function parsePagesToConvert() {
    const totalPages = currentPdfDoc.numPages;
    
    if (pageRangeSelect.value === 'all') {
        return Array.from({length: totalPages}, (_, i) => i + 1);
    }
    
    const customPages = customPagesInput.value.trim();
    if (!customPages) {
        showError('⚠️ Por favor, especifica qué páginas deseas convertir.');
        return null;
    }

    const pages = new Set();
    const parts = customPages.split(',');

    for (const part of parts) {
        if (part.includes('-')) {
            const [start, end] = part.split('-').map(n => parseInt(n.trim()));
            if (!isNaN(start) && !isNaN(end)) {
                for (let i = start; i <= Math.min(end, totalPages); i++) {
                    if (i > 0) pages.add(i);
                }
            }
        } else {
            const num = parseInt(part.trim());
            if (!isNaN(num) && num > 0 && num <= totalPages) {
                pages.add(num);
            }
        }
    }

    return Array.from(pages).sort((a, b) => a - b);
}

async function convertPdf() {
    if (!currentPdfDoc) return;

    convertedImages = [];
    const pagesToConvert = parsePagesToConvert();
    
    if (!pagesToConvert || pagesToConvert.length === 0) {
        return;
    }

    hideAllSections();
    progressSection.style.display = 'block';
    convertBtn.disabled = true;

    const quality = parseFloat(qualitySelect.value);
    const totalPages = pagesToConvert.length;

    try {
        for (let i = 0; i < pagesToConvert.length; i++) {
            const pageNum = pagesToConvert[i];
            
            try {
                const page = await currentPdfDoc.getPage(pageNum);
                const canvas = document.createElement('canvas');
                
                // Configurar resolución
                const viewport = page.getViewport({scale: 2 * quality});
                const context = canvas.getContext('2d');
                canvas.width = viewport.width;
                canvas.height = viewport.height;

                await page.render({
                    canvasContext: context,
                    viewport: viewport
                }).promise;

                // Convertir canvas a imagen
                const imageData = canvas.toDataURL('image/png');
                const fileSize = (imageData.length * 0.75 / 1024).toFixed(2);

                convertedImages.push({
                    page: pageNum,
                    data: imageData,
                    size: fileSize,
                    filename: `pagina_${pageNum}.png`
                });

                // Actualizar progreso
                const progress = ((i + 1) / totalPages) * 100;
                progressFill.style.width = progress + '%';
                progressText.textContent = `Procesando: ${Math.round(progress)}%`;

            } catch (error) {
                console.error(`Error en página ${pageNum}:`, error);
            }
        }

        showResults();
    } catch (error) {
        showError('⚠️ Error al convertir el PDF. Intenta de nuevo.');
        console.error('Error conversión:', error);
    } finally {
        convertBtn.disabled = false;
    }
}

function showResults() {
    hideAllSections();
    resultsSection.style.display = 'block';
    gallery.innerHTML = '';

    convertedImages.forEach((img) => {
        const col = document.createElement('div');
        col.className = 'col';
        col.innerHTML = `
            <div class="card h-100">
                <div class="image-container">
                    <img src="${img.data}" alt="Página ${img.page}" loading="lazy">
                </div>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">Página ${img.page}</h5>
                    <p class="card-text text-muted"><small>${img.size} KB</small></p>
                    <div class="btn-group mt-auto" role="group">
                        <button class="btn btn-sm btn-primary" onclick="downloadImage(${convertedImages.indexOf(img)})">
                            <i class="bi bi-download"></i> Descargar
                        </button>
                        <button class="btn btn-sm btn-outline-secondary" onclick="viewImage(${convertedImages.indexOf(img)})">
                            <i class="bi bi-eye"></i> Ver
                        </button>
                    </div>
                </div>
            </div>
        `;
        gallery.appendChild(col);
    });
}

function downloadImage(index) {
    const img = convertedImages[index];
    const link = document.createElement('a');
    link.href = img.data;
    link.download = img.filename;
    link.click();
}

function viewImage(index) {
    const modal = new bootstrap.Modal(document.getElementById('previewModal'));
    document.getElementById('modalTitle').textContent = `Página ${convertedImages[index].page}`;
    document.getElementById('modalImage').src = convertedImages[index].data;
    modal.show();
}

async function downloadAllImages() {
    if (convertedImages.length === 0) return;

    const zip = new JSZip();
    const folder = zip.folder('imagenes_pdf');

    convertedImages.forEach((img) => {
        // Convertir data URL a blob
        const base64 = img.data.split(',')[1];
        folder.file(img.filename, base64, {base64: true});
    });

    try {
        const content = await zip.generateAsync({type: 'blob'});
        saveAs(content, 'imagenes_pdf.zip');
    } catch (error) {
        showError('⚠️ Error al crear el ZIP. Intenta descargar las imágenes una por una.');
        console.error('Error ZIP:', error);
    }
}

function resetApp() {
    currentPdfDoc = null;
    convertedImages = [];
    pdfInput.value = '';
    customPagesInput.value = '';
    pageRangeSelect.value = 'all';
    customPagesInput.style.display = 'none';
    
    uploadBox.innerHTML = `
        <span class="upload-icon">📤</span>
        <p>Haz clic o arrastra un PDF aquí</p>
        <span class="file-info">Máximo 50 MB</span>
    `;
    
    hideAllSections();
    optionsSection.style.display = 'none';
}

function hideAllSections() {
    optionsSection.style.display = 'none';
    progressSection.style.display = 'none';
    resultsSection.style.display = 'none';
}

function showError(message) {
    const errorMsg = document.getElementById('errorMsg');
    const errorText = document.getElementById('errorText');
    errorText.textContent = message;
    errorMsg.style.display = 'block';
}

// Permitir click en el input al hacer click en la caja
document.querySelector('.upload-label').addEventListener('click', (e) => {
    if (e.target !== pdfInput) {
        pdfInput.click();
    }
});
