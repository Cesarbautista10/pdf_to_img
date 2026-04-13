# PDF a Imagen 🖼️

Una aplicación web moderna para convertir páginas de PDF a imágenes PNG de alta calidad. Completamente funcional en **GitHub Pages** sin necesidad de servidor backend.

## ✨ Características

- 📤 **Carga de PDF** - Arrastra y suelta o selecciona archivos PDF
- 🎨 **Múltiples opciones de calidad** - De baja a muy alta resolución (150-450 DPI)
- 📄 **Conversión selectiva** - Elige todas las páginas o especifica un rango personalizado
- 📥 **Descargas flexibles** - Descarga imágenes individuales o todas en un ZIP
- 👁️ **Vista previa** - Visualiza las imágenes antes de descargar
- 📱 **Responsive** - Funciona perfectamente en móviles y tablets
- ⚡ **Sin servidor** - Todo se procesa en el navegador del cliente
- 🚀 **Compatible con GitHub Pages** - Solo archivos HTML/CSS/JS

## 🚀 Cómo usar

### Opción 1: GitHub Pages (Recomendado)

1. **Fork o clona este repositorio**
   ```bash
   git clone https://github.com/tu-usuario/pdf_to_img.git
   cd pdf_to_img
   ```

2. **Ve a Settings → Pages en tu repositorio**
   - Source: `main` o `master` (la rama donde esté el código)
   - Selecciona `/ (root)` como carpeta

3. **Tu app estará disponible en:**
   ```
   https://tu-usuario.github.io/pdf_to_img/
   ```

### Opción 2: Localmente

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/pdf_to_img.git
   cd pdf_to_img
   ```

2. **Abre `index.html` en tu navegador**
   - Opción simple: Doble clic en `index.html`
   - Opción con servidor local (recomendado):
     ```bash
     # Con Python
     python -m http.server 8000
     
     # O con Node.js (si tienes http-server instalado)
     npx http-server
     ```
   - Luego accede a `http://localhost:8000`

## 📋 Requisitos

- **Navegador moderno** con soporte para:
  - Canvas API
  - FileReader API
  - Fetch API
  - ES6 JavaScript

**Compatible con:**
- Chrome/Chromium (v90+)
- Firefox (v88+)
- Safari (v14+)
- Edge (v90+)

## 🎯 Cómo usar la aplicación

1. **Carga un PDF**
   - Haz clic en el área de carga o arrastra un PDF
   - El archivo se procesa en tu navegador (privado y seguro)

2. **Configura opciones**
   - Selecciona la calidad deseada (150-450 DPI)
   - Elige convertir todas las páginas o un rango personalizado
     - Ejemplos de rango: `1,3,5-7` convierte páginas 1, 3, 5, 6, 7

3. **Convierte el PDF**
   - Haz clic en "Convertir PDF"
   - Espera a que se procesen todas las páginas

4. **Descarga las imágenes**
   - Descarga individual: botón "⬇️ Descargar" en cada imagen
   - Descargar todo: botón "⬇️ Descargar todo" (formato ZIP)

## 📦 Librerías utilizadas

| Librería | Propósito | Licencia |
|----------|-----------|---------|
| [PDF.js](https://mozilla.github.io/pdf.js/) | Procesar archivos PDF | Apache 2.0 |
| [JSZip](https://stuk.github.io/jszip/) | Crear archivos ZIP | MIT |
| [FileSaver.js](https://github.com/eligrey/FileSaver.js/) | Descargar archivos | MIT/CC0 |

Todas las librerías se cargan desde CDN (sin necesidad de instalación).

## 🏗️ Estructura del proyecto

```
pdf_to_img/
├── index.html       # Página principal
├── style.css        # Estilos y diseño
├── script.js        # Lógica de la aplicación
├── README.md        # Este archivo
└── .gitignore       # Archivos a ignorar en Git
```

## ⚙️ Configuración para GitHub Pages

Si quieres customizar el proyecto para GitHub Pages:

### Opción A: Usar el repositorio como está
Solo necesitas habilitar GitHub Pages en settings.

### Opción B: Usar una carpeta `docs/`
1. Copia todos los archivos a la carpeta `docs/`
2. En Settings → Pages, selecciona "docs" como fuente
3. Tu app estará en `https://usuario.github.io/pdf_to_img/`

## 🎨 Personalización

### Cambiar colores
Edita las variables de color en `style.css`:
```css
/* Gradiente principal */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Cambiar a tus colores favoritosej:
background: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%);
```

### Cambiar configuraciones DPI
En `script.js`, modifica el select de calidad en `index.html`:
```html
<option value="1">Baja (150 DPI)</option>
<option value="2" selected>Alta (300 DPI)</option>
```

### Aumentar límite de tamaño de archivo
En `script.js`, busca esta línea:
```javascript
if (file.size > 52428800) { // 50 MB
```

## 🔒 Privacidad y Seguridad

- ✅ **Completamente privado** - Todo se procesa en tu navegador
- ✅ **Sin servidor** - Tus PDFs nunca se envían a internet
- ✅ **Sin cookies** - No se almacena información personal
- ✅ **Open Source** - Código completamente transparente

## 📱 Compatibilidad

| Navegador | Desktop | Móvil |
|-----------|---------|-------|
| Chrome    | ✅      | ✅    |
| Firefox   | ✅      | ✅    |
| Safari    | ✅      | ✅    |
| Edge      | ✅      | ✅    |

## 🐛 Problemas conocidos y soluciones

### "El PDF no carga"
- Verifica que sea un PDF válido
- Intenta con otro PDF
- Abre la consola (F12) para ver errores

### "Las imágenes se ven pixeladas"
- Aumenta la calidad en las opciones
- Selecciona "Muy Alta (450 DPI)"

### "No puedo descargar como ZIP"
- Tu navegador podría requerir permiso
- Descarga las imágenes una por una
- Intenta con otro navegador

### "El archivo es muy lento"
- Los PDFs muy grandes pueden tomar tiempo
- Divide el PDF en partes más pequeñas
- Reduce el DPI de calidad

## 📄 Licencia

MIT License - Puedes usar este proyecto libremente

## 🤝 Contribuir

¿Encontraste un bug o tienes una idea? 
- Crea un issue en GitHub
- Envía un pull request con mejoras

## 📧 Contacto

Si tienes preguntas o sugerencias, puedes:
- Crear un issue en el repositorio
- Contactarme a través de GitHub

---

**Hecho con ❤️ para convertir PDFs fácilmente**

Última actualización: Abril 2026
