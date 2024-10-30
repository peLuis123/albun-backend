# GameHub API - Plataforma de Gestión y Acceso a Videojuegos
 
## Descripción del proyecto 📋
GameHub API es una plataforma RESTful diseñada para la gestión de videojuegos y el acceso de usuarios mediante un sistema de suscripciones y compras. Ofrece rutas seguras y específicas para administradores y usuarios, permitiendo la creación, edición y consulta de videojuegos, la asignación de suscripciones, y la gestión de bibliotecas de juegos de cada usuario.

## 📚 Funcionalidades 

* 📊 **Gestión de Videojuegos**: Permite agregar, editar, y eliminar videojuegos en la plataforma, incluyendo detalles como género, descripción, imagen, precio y métodos de acceso (compra o suscripción).
* 🔒 **Control de Acceso por Rol**: Los administradores pueden gestionar toda la información de videojuegos y usuarios, mientras que los usuarios tienen acceso limitado basado en su plan de suscripción.
* 💼 **Sistema de Subscripción**: Los usuarios pueden suscribirse a planes mensuales, anuales o gratuitos, con acceso restringido a juegos basados en el plan seleccionado.
* 🎮 **Biblioteca de Juegos Personalizada**: Cada usuario tiene una biblioteca de juegos adquiridos por compra o suscripción, actualizada según sus transacciones y su plan.
* 📈 **Control de Suscripciones Activas**: Gestión de suscripciones activas para asegurar que los usuarios accedan solo a juegos de acuerdo a sus planes vigentes.
* 🧩 **Sistema de Autenticación Seguro**: Autenticación y autorización de usuarios mediante JWT, con roles y permisos específicos para cada tipo de usuario.
* 🌐 **API Documentada**: Documentación completa de la API en formato Swagger, que detalla cada endpoint y sus requerimientos de uso.

## 🛠️ Requisitos del Proyecto

Para ejecutar este proyecto, necesitarás tener instalados los siguientes programas:

- **Node.js** (versión 16 o superior): Entorno de ejecución para construir y ejecutar JavaScript en el servidor.
- **MongoDB**: Base de datos NoSQL para almacenar usuarios, suscripciones, videojuegos, bibliotecas, etc.
- **Express.js**: Framework de Node.js utilizado para construir la API REST.

Asegúrate de que estos programas estén instalados y correctamente configurados antes de ejecutar el proyecto.


## 🚀 Instrucciones para ejecutar el proyecto
 
1. Clonar el repositorio
* git clone https://github.com/peLuis123/albun-backend
* cd nombre-del-repositorio
2. Abrir el proyecto con el IDE de tu preferencia.
3. Instalar las dependencias y librerías necesarias (definidas en package.json):
* npm install
4. Configurar las variables de entorno
* crear un archivo .env en la raíz del proyecto.
* configuracion segun el archivo .env.example
5. Crear las configuraciones iniciales en la base de datos 
* npm run seed
6. Inicializar el servidor
* npm run start
7. La aplicacion estara corriendo por default en http://localhost:3000

## 🔗 Endpoints de la API

### Autenticación (`/api/v1/auth`)
- **POST** `/signup` - Registro de un nuevo usuario.
- **POST** `/login` - Iniciar sesión y obtener token de autenticación.
- **GET** `/logout` - Cerrar sesión y limpiar token.
- **GET** `/getinfo` - Obtener información del usuario autenticado.

### Usuarios (`/api/v1/user`)
- **GET** `/` - Obtener lista de todos los usuarios (Solo Admin).
- **POST** `/` - Crear un nuevo usuario (Solo Admin).
- **GET** `/:id` - Obtener información de un usuario específico.
- **PATCH** `/:id` - Actualizar información de un usuario específico.
- **DELETE** `/:id` - Eliminar un usuario específico (Solo Admin).

### Suscripciones (`/api/v1/sub`)
- **GET** `/` - Obtener todos los tipos de suscripción.
- **POST** `/subscribe` - Suscribir el usuario autenticado a un plan.
- **POST** `/assign` - Asignar un plan de suscripción a un usuario (Solo Admin).
- **POST** `/cancel` - Cancelar la suscripción del usuario autenticado.
- **POST** `/cancelAssign` - Cancelar la suscripción de un usuario específico (Solo Admin).

### Videojuegos (`/api/v1/game`)
- **POST** `/add` - Agregar un nuevo videojuego (Solo Admin).
- **PATCH** `/update/:videojuegoId` - Actualizar un videojuego específico (Solo Admin).
- **DELETE** `/delete/:videojuegoId` - Eliminar un videojuego específico (Solo Admin).
- **GET** `/` - Obtener lista de todos los videojuegos (Filtrado por suscripción para usuarios).
- **GET** `/:videojuegoId` - Obtener detalles de un videojuego específico.

### Biblioteca (`/api/v1/library`)
- **POST** `/add` - Agregar un videojuego a la biblioteca del usuario autenticado.
- **GET** `/` - Obtener la biblioteca completa del usuario autenticado.
- **GET** `/:bibliotecaId` - Obtener detalles de un videojuego específico en la biblioteca.
- **PATCH** `/:bibliotecaId` - Actualizar los detalles de un videojuego en la biblioteca.
- **DELETE** `/:bibliotecaId` - Eliminar un videojuego de la biblioteca del usuario.


## 👩🏻‍💻 Autores
- Pedro Luis Ramos Calla

