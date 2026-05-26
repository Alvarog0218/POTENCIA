# PotencIA

Proyecto convertido a React con Vite.

## Comandos

```bash
npm install
npm run dev
npm run build
```

## Estructura para archivos

- `src/App.jsx`: aplicación principal convertida desde el archivo original.
- `src/index.css`: Tailwind y estilos globales.
- `public/assets/images`: imágenes públicas.
- `public/assets/fonts`: fuentes públicas.
- `public/assets/files`: documentos u otros archivos.

Los archivos dentro de `public` se referencian desde React con rutas absolutas. Ejemplo:

```jsx
<img src="/assets/images/logo.png" alt="PotencIA" />
```

Para usar una fuente subida a `public/assets/fonts`, agrega un `@font-face` en `src/index.css`.
