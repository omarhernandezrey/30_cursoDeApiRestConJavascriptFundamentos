# 30_cursoDeApiRestConJavascriptFundamentos
# 🐱 Michis App  
**Curso de API REST con JavaScript – Fundamentos (Proyecto 30)**

Aplicación web que consume la **Cat API** para mostrar imágenes aleatorias de gatitos, permitir al usuario marcar sus favoritos, eliminarlos y subir sus propias fotos.  
Este proyecto acompaña la ruta de aprendizaje de consumo de API REST con JavaScript, cubriendo peticiones **GET, POST, DELETE** y subida de archivos (**multipart/form‑data**).

---

## ✨ Características

| Módulo                    | Descripción                                                                 |
| ------------------------- | --------------------------------------------------------------------------- |
| Gatitos aleatorios        | Dos imágenes nuevas cada vez que el usuario pulsa **“Recargar”**            |
| Favoritos                 | Guarda/borra favoritos persistentes en la cuenta de Cat API                 |
| Subir foto                | Formulario para seleccionar una imagen local y enviarla a la API            |
| UI responsiva             | Diseño adaptativo (mobile → 4K) con tarjetas, sombras y animaciones sutiles |

---

## 🛠️ Tecnologías y herramientas

| Categoría              | Tecnologías / librerías                                                                 |
| ---------------------- | --------------------------------------------------------------------------------------- |
| Lenguajes              | **HTML5**, **CSS3**, **JavaScript ES6+**                                                |
| Peticiones HTTP        | [`fetch`](https://developer.mozilla.org/docs/Web/API/fetch) nativo, **Axios ^1.6**       |
| API pública            | [The Cat API](https://thecatapi.com/) (endpoints `/images`, `/favourites`, `/upload`)    |
| Estilos avanzados      | Flexbox, CSS Grid, custom properties, media queries, efectos hover/active               |
| Diseño & Accesibilidad | Inter, contraste adecuado, foco accesible, transiciones suaves                          |
| Gestión de versiones   | **Git** y **GitHub** (ramas, commits semánticos)                                        |

---

## 🚀 Instalación rápida

```bash
# 1. Clonar el repositorio
git clone https://github.com/omarhernandezrey/30_cursoDeApiRestConJavascriptFundamentos.git
cd 30_cursoDeApiRestConJavascriptFundamentos

# 2. Abrir index.html en tu navegador favorito 🤟
#    (No necesitas servidores ni build‑steps)

## Estructura
├── index.html      # Mark‑up principal
├── styles.css      # Estilos responsivos y modernos
├── main.js         # Lógica de consumo de la API
└── MICHIS.jpg      # Captura referencial de la interfaz

👨‍💻 Autor
Omar Hernández Rey – Software Development Student
GitHub @omarhernandezrey • omarhernandezrey@gmail.com

🖼️ Captura de pantalla![localhost_5500_](https://github.com/user-attachments/assets/982a20c7-c006-4a8e-abbe-839d1b5e936d)


