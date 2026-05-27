# PigTracker V2 — PWA

App web progresiva para el detector de PIG por campo electromagnético 22Hz.
Compatible con Android y iOS. Funciona offline después de la primera carga.

## Estructura de archivos

```
pigtracker-v2/
├── index.html      ← App principal (HTML + CSS + JS)
├── sw.js           ← Service Worker (cache offline)
├── manifest.json   ← Manifest PWA (instalación en celular)
├── icon-192.png    ← Ícono para Android (agregar manualmente)
├── icon-512.png    ← Ícono para Android (agregar manualmente)
└── README.md
```

## Despliegue en GitHub Pages

1. Crear un repositorio nuevo en GitHub (puede ser privado o público)
2. Subir todos los archivos de esta carpeta al repositorio
3. Ir a Settings → Pages → Source: "Deploy from a branch"
4. Seleccionar branch: `main` / carpeta: `/ (root)`
5. Guardar — GitHub Pages genera la URL en ~1 minuto

La URL queda como: `https://TU_USUARIO.github.io/NOMBRE_REPO`

## Instalar en el celular

### Android (Chrome)
1. Abrir la URL en Chrome
2. Menú (⋮) → "Agregar a pantalla de inicio"
3. La app se instala como aplicación nativa

### iOS (Safari)
1. Abrir la URL en Safari (no Chrome en iOS)
2. Botón compartir → "Agregar a pantalla de inicio"
3. Confirmar — aparece el ícono en el home screen

## Uso en campo sin señal

Una vez instalada y abierta al menos una vez con señal, la app
funciona completamente offline gracias al Service Worker.

El historial descargado por BLE se guarda en IndexedDB del celular
y persiste entre sesiones aunque no haya conexión a internet.

## Compatibilidad Web Bluetooth

Web Bluetooth requiere HTTPS o localhost.
GitHub Pages provee HTTPS automáticamente.

- Android: Chrome ✓, Edge ✓, Opera ✓
- iOS: Safari NO (Apple no implementó Web Bluetooth)
       → En iOS usar la app solo para ver historial cacheado

## Agregar íconos

Para que la instalación quede completa necesitás dos PNGs:
- icon-192.png (192×192 px, fondo #070e1c, logo blanco)
- icon-512.png (512×512 px, mismo estilo)

Podés generarlos en https://realfavicongenerator.net o con cualquier editor.

## Actualizar la app

Para actualizar la versión en campo:
1. Subir los archivos nuevos al repositorio GitHub
2. Cambiar el nombre del cache en sw.js: `pigtracker-v2-1` → `pigtracker-v2-2`
3. GitHub Pages publica en ~1 minuto
4. La próxima vez que el operador abra la app con señal, se actualiza automáticamente
