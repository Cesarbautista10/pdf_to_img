# PDF to Image Converter

A simple web application to convert PDF pages to PNG images. Works entirely in the browser without any backend server.

## Features

- Upload PDF files via drag and drop or file selection
- Convert to PNG images with adjustable quality (150-450 DPI)
- Select specific pages or convert all pages
- Download individual images or as a ZIP file
- Responsive design for mobile and desktop
- 100% client-side processing (no server required)

## Usage

1. Open the application in your browser
2. Upload a PDF file
3. Select output quality and page range
4. Click "Convert PDF"
5. Download the generated images

## Image Naming

Images are automatically named with the following format:
```
originalfilename_YYYY-MM-DD_page_X.png
```

Example: `document_2026-04-13_page_1.png`

## Technology Stack

- HTML5, CSS3, JavaScript
- Bootstrap 5 for styling
- PDF.js for PDF processing
- JSZip for creating ZIP files
- FileSaver.js for file downloads

## Browser Compatibility

- Chrome/Chromium (v90+)
- Firefox (v88+)
- Safari (v14+)
- Edge (v90+)

## Privacy

All processing happens in your browser. No files are uploaded to any server.

