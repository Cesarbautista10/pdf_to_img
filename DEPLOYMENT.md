# Guía de Despliegue en GitHub Pages

## Pasos rápidos para desplegar (5 minutos)

### 1. Fork o clona el repositorio
```bash
# Si clonas:
git clone https://github.com/tu-usuario/pdf_to_img.git
cd pdf_to_img

# Si haces fork en GitHub.com, luego clona tu fork
```

### 2. Habilita GitHub Pages
1. Ve a tu repositorio en GitHub
2. Click en **Settings** (Configuración)
3. Scroll down a **Pages** (o busca "Pages")
4. En "Source" selecciona:
   - Branch: `main` (o `master` según corresponda)
   - Folder: `/ (root)`
5. Click en **Save**

### 3. ¡Listo! Tu app está en vivo

Accede a tu app en:
```
https://tu-nombre-de-usuario.github.io/pdf_to_img/
```

> **Nota:** Puede tomar 1-2 minutos para que GitHub Pages procese y publique tu sitio.

---

## Opciones de despliegue

### Opción 1: Usar la rama `main` (Recomendado ⭐)

La configuración por defecto. Tu sitio se actualiza automáticamente cuando haces push.

**Ventajas:**
- Simplicidad máxima
- Actualizaciones automáticas
- Ideal para desarrollo continuo

**Pasos:**
1. Habilita Pages desde `main`
2. Haz cambios y `git push`
3. Tu sitio se actualiza automáticamente

### Opción 2: Usar una rama `gh-pages`

Ideal si quieres separar el código de la versión publicada.

**Pasos:**
```bash
# Crear y cambiar a rama gh-pages
git checkout --orphan gh-pages

# Mantener solo los archivos de la app
git reset --hard

# Si tienes los archivos en la rama main, copiarlos
git checkout main -- index.html style.css script.js README.md

# Hacer commit
git add .
git commit -m "Deploy initial version"

# Push
git push origin gh-pages

# Volver a main
git checkout main
```

En GitHub:
- Settings → Pages
- Source: `gh-pages`
- Folder: `/ (root)`

### Opción 3: Usar una carpeta `docs/`

Para mantener todo en la misma rama.

**Pasos:**
```bash
# Crear carpeta docs
mkdir docs

# Copiar archivos
cp index.html style.css script.js README.md docs/

# Hacer commit
git add docs/
git commit -m "Add docs folder for GitHub Pages"
git push
```

En GitHub:
- Settings → Pages
- Source: `main`
- Folder: `/docs`

---

## Solución de problemas

### "Tu sitio está listo pero vacío"
- GitHub Pages puede tomar 1-2 minutos
- Espera un poco y recarga la página
- Abre DevTools (F12) y revisa errores

### "Recibo error 404"
- Verifica que los archivos estén en la rama correcta
- Verifica que `index.html` esté en la carpeta raíz
- Prueba borrar cache (Ctrl+Shift+R)

### "Los estilos no se ven correctamente"
- Abre DevTools (F12)
- Ve a Console y busca errores de recursos
- Verifica que las rutas se CSS sean correctas

### "Los PDFs no se cargan"
- Es un problema del navegador, no del servidor
- Abre la consola (F12) para ver errores
- Algunos navegadores requieren contenido cifrado (HTTPS)
- El certificado SSL de GitHub Pages es automático, así que no es problema

---

## Verificar que todo funciona

Después de desplegar:

1. **Accede a tu URL:** `https://tu-usuario.github.io/pdf_to_img/`
2. **Prueba la carga de PDF:**
   - Sube un PDF pequeño
   - Verifica que aparezcan las páginas
   - Descarga una imagen
3. **Prueba en móvil:**
   - Accede desde un teléfono
   - Verifica que sea responsive

---

## Actualizaciones futuras

Para actualizar tu app después del primer despliegue:

```bash
# Edita los archivos localmente

# Commit y push
git add .
git commit -m "Descripción del cambio"
git push origin main

# GitHub Pages actualiza automáticamente en unos minutos
```

---

## Tips profesionales 💡

### Agregar un dominio personalizado
1. Settings → Pages
2. "Custom domain"
3. Ingresa tu dominio (ej: convertidor-pdf.com)
4. Configura tus registros DNS según las instrucciones

### Agregar un certificado SSL
- GitHub Pages incluye HTTPS automáticamente
- Tu sitio es seguro por defecto ✅

### Monitorear despliegues
- Ve a **Actions** en tu repositorio
- GitHub Pages tiene logs automáticos
- Puedes ver el estado de cada despliegue

---

## Preguntas frecuentes

**Pregunta:** ¿Necesito hacer algo especial para que funcione?
**Respuesta:** No, GitHub Pages sirve archivos HTML/CSS/JS automáticamente.

**Pregunta:** ¿Mis PDFs se envían a un servidor?
**Respuesta:** No, todo se procesa en tu navegador. Completamente privado.

**Pregunta:** ¿Cuánto tiempo tarda en publicarse?
**Respuesta:** Generalmente 1-2 minutos después de hacer push.

**Pregunta:** ¿Puedo usar mi propio dominio?
**Respuesta:** Sí, ve a Settings → Pages → Custom domain.

---

¡Tu app está lista! 🚀

Cualquier duda, abre un issue en el repositorio.
