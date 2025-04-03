
[![Deploy with Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

---

# EasyRental.io

**Desarrollado por:** Jose Alejandro Trejo  
**Aplicación:** Plataforma de gestión de propiedades y renta  
**Framework:** React + TypeScript + Tailwind + Vite

---

## 🚀 Despliegue en Netlify

Sigue estos pasos para publicar EasyRental.io en [Netlify](https://www.netlify.com):

### 1. Clona o sube el proyecto

Puedes subir directamente el archivo `.zip` proporcionado o clonar el repositorio si lo tienes en GitHub.

### 2. Configura el Proyecto

Al crear un nuevo sitio en Netlify, asegúrate de lo siguiente:

- **Build Command:** `npm run build`
- **Publish directory:** `dist`
- **Node Version:** Usa la versión recomendada por Netlify (ej. Node 18+)

> Si subes el proyecto manualmente como carpeta, asegúrate que los archivos `netlify.toml` y `public/_redirects` estén presentes.

### 3. Redirección para SPA

La configuración ya incluye:

```
_redirects → public/_redirects
netlify.toml → manejo automático de rutas dinámicas
```

Esto asegura que cualquier ruta como `/dashboard`, `/propiedades`, etc., no cause error 404.

---

## 📁 Estructura del Proyecto

- `src/` → Código fuente de la app
- `public/` → Archivos públicos, favicon, `_redirects`
- `netlify.toml` → Configuración para despliegue
- `dist/` → Carpeta de salida generada con `npm run build` (Netlify la usa automáticamente)

---

## 🛠 Dependencias principales

- `React`
- `Vite`
- `TailwindCSS`
- `React Router DOM`
- `Zod`, `React Hook Form`

---

## 📌 Créditos

> Proyecto desarrollado por **Jose Alejandro Trejo** para EasyRental.io – 2025.
