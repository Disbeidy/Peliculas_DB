# 🎬 API de Gestión de Películas – Backend con Node.js, Express y MongoDB

Proyecto desarrollado como parte del curso de Desarrollo de Software.  
Esta API permite gestionar información relacionada con películas, incluyendo:

- Géneros
- Directores
- Productoras
- Tipos (Película, Serie, etc.)
- Media (Películas o series completas con relaciones)

---
## 🛠️ Inicio del proyecto

El proyecto fue iniciado completamente desde cero utilizando la terminal.  
Primero se creó la carpeta principal:
mkdir backend

Luego se ingresó al proyecto:
cd backend

Se inicializó Node.js:
npm init -y

Posteriormente se creó la estructura base del backend:
mkdir src mkdir src/controllers mkdir src/models mkdir src/routes mkdir src/database

Finalmente, se creó el archivo principal:
index.js

## 🚀 Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Postman (para pruebas)
- Dotenv (manejo de variables de entorno)

---

## 📁 Estructura del proyecto
backend/
│
├── controllers/
│   ├── directorController.js
│   ├── generoController.js
│   ├── mediaController.js
│   ├── productoraController.js
│   └── tipoController.js
│
├── db/
│   └── db-connection-mongo.js
│
├── models/
│   ├── Director.js
│   ├── Genero.js
│   ├── Media.js
│   ├── Productora.js
│   └── Tipo.js
│
├── routes/
│   ├── director.js
│   ├── genero.js
│   ├── media.js
│   ├── productora.js
│   └── tipo.js
│
├── node_modules/   (generado automáticamente)
│
├── .env
├── .env.template
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── index.js


---

## ⚙️ Configuración del entorno

Antes de ejecutar el proyecto, crea un archivo `.env` en la raíz con las siguientes variables:
PORT=4000 
MONGO_URI=tu_cadena_de_conexion 
DB_NAME=nombre_de_tu_base

Puedes guiarte con el archivo `.env.template` incluido en el proyecto.

---

## ▶️ Cómo ejecutar el proyecto

1. Instalar dependencias:
npm install

2. Ejecutar el servidor:
npm start

El servidor se ejecutará en:
http://localhost:4000


---

## 📌 Endpoints principales

### Género
- POST `/api/generos`
- GET `/api/generos`
- PUT `/api/generos/:id`
- DELETE `/api/generos/:id`

### Director
- POST `/api/directores`
- GET `/api/directores`

### Productora
- POST `/api/productoras`
- GET `/api/productoras`

### Tipo
- POST `/api/tipos`
- GET `/api/tipos`

### Media
- POST `/api/media`
- GET `/api/media`
- PUT `/api/media/:id`
- DELETE `/api/media/:id`

---

## 🧪 Pruebas con Postman

El proyecto fue probado completamente con Postman, verificando:

- Creación de documentos
- Listado
- Actualización
- Eliminación
- Relaciones con `populate`

---

## 👩‍💻 Autoras

**Disbeidy Anzueta Gongora y Daniela Anzueta Gongora**  
Estudiantes de Tecnología en Desarrollo de Software  
Institución Universitaria Digital de Antioquia 

---

## 📄 Licencia

Este proyecto es de uso académico.