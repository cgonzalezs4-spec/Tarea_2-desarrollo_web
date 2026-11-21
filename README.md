
# CatalogoAPI - API REST de Gestión de Productos

## 1. Descripción del proyecto

CatalogoAPI es una aplicación backend desarrollada con Node.js, Express y MongoDB, diseñada para administrar un catálogo de productos mediante una API REST.

El sistema permite registrar usuarios, iniciar sesión mediante autenticación JWT, consultar productos y realizar operaciones de creación, actualización y eliminación, aplicando controles de acceso según el rol asignado a cada usuario.

El proyecto fue desarrollado como parte de una actividad académica de Desarrollo Web, con el propósito de implementar servicios REST, persistencia de datos y mecanismos de seguridad.

## 2. Objetivo

Desarrollar una API REST que permita administrar productos mediante operaciones CRUD, utilizando MongoDB para almacenar información y JSON Web Token (JWT) para proteger las funcionalidades que requieren autenticación y permisos de administrador.

## 3. Tecnologías utilizadas

- Node.js: entorno de ejecución de JavaScript.
- Express.js: framework para desarrollar la API REST.
- MongoDB: base de datos NoSQL.
- Mongoose: biblioteca para definir modelos y gestionar MongoDB.
- JWT: autenticación mediante tokens.
- bcryptjs: cifrado de contraseñas.
- dotenv: administración de variables de entorno.
- cors: configuración de acceso entre aplicaciones.
- Nodemon: reinicio automático del servidor durante el desarrollo.
- Postman: pruebas de las solicitudes HTTP.
- MongoDB Compass: visualización de la información almacenada.
- Visual Studio Code: entorno de desarrollo.

## 4. Estructura del proyecto

```text
catalogoApi/
├── src/
│   ├── controllers/
│   │   └── authController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Usuario.js
│   │   ├── Producto.js
│   │   └── Favorito.js
│   └── routes/
│       ├── authRoutes.js
│       └── productoRoutes.js
├── .env
├── package.json
├── package-lock.json
└── server.js
```

## 5. Requisitos previos

Para ejecutar la aplicación es necesario contar con:

- Node.js y npm instalados.
- MongoDB instalado y ejecutándose.
- Visual Studio Code o un editor compatible.
- Postman para realizar las pruebas.
- MongoDB Compass para consultar los registros.

## 6. Instalación y ejecución

Abrir una terminal en la carpeta principal del proyecto.

Ingresar al backend:

```bash
cd catalogoApi
```

Instalar las dependencias:

```bash
npm install
```

Crear el archivo `.env` dentro de `catalogoApi` con la siguiente configuración de ejemplo:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/catalogo_api
JWT_SECRET=REEMPLAZAR_POR_UN_SECRETO_ALEATORIO_SEGURO
```

El valor de JWT_SECRET debe ser una clave privada, extensa y generada de manera segura. No debe publicarse en GitHub.

Iniciar el servidor:

```bash
npm run dev
```

Cuando la conexión se establece correctamente, la terminal muestra:

```text
MongoDB conectado correctamente
Servidor ejecutándose en http://localhost:3000
```

Comprobar el funcionamiento desde el navegador:

```text
http://localhost:3000/
```

Respuesta esperada:

```json
{
  "mensaje": "API CatalogoAPI funcionando correctamente"
}
```

## 7. Autenticación y seguridad

La aplicación utiliza JWT para controlar el acceso a las funcionalidades protegidas.

Las contraseñas de los usuarios se almacenan cifradas mediante bcryptjs.

El sistema contempla dos roles:

- usuario: puede consultar el catálogo de productos.
- admin: puede consultar, crear, actualizar y eliminar productos.

Las operaciones administrativas requieren un token JWT válido y que el usuario tenga asignado el rol admin.

El token se obtiene mediante el inicio de sesión y debe enviarse en las solicitudes protegidas utilizando el encabezado:

```text
Authorization: Bearer TOKEN_JWT
```

El token de acceso tiene una duración de una hora.

## 8. Endpoints de la API

### Autenticación

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | /api/auth/registro | Registrar un usuario |
| POST | /api/auth/login | Iniciar sesión y obtener JWT |

### Productos

| Método | Endpoint | Descripción | Acceso |
|--------|----------|-------------|--------|
| GET | /api/productos | Consultar productos | Público |
| POST | /api/productos | Crear un producto | Administrador |
| PUT | /api/productos/:id | Actualizar un producto | Administrador |
| DELETE | /api/productos/:id | Eliminar un producto | Administrador |

## 9. Ejemplos de solicitudes

### Registro de usuario

Método: POST

URL:

```text
http://localhost:3000/api/auth/registro
```

Cuerpo JSON:

```json
{
  "nombre": "Usuario de prueba",
  "correo": "prueba@ejemplo.com",
  "password": "CAMBIAR_POR_CLAVE_SEGURA"
}
```

### Inicio de sesión

Método: POST

URL:

```text
http://localhost:3000/api/auth/login
```

Cuerpo JSON:

```json
{
  "correo": "prueba@ejemplo.com",
  "password": "CAMBIAR_POR_CLAVE_SEGURA"
}
```

Si las credenciales son correctas, la API devuelve un token JWT y los datos del usuario.

### Crear producto

Método: POST

URL:

```text
http://localhost:3000/api/productos
```

Autorización: Bearer Token de un administrador.

Cuerpo JSON:

```json
{
  "nombre": "Laptop Lenovo",
  "descripcion": "Computadora portátil con 16 GB de RAM y almacenamiento SSD",
  "categoria": "Tecnología",
  "precio": 750
}
```

### Consultar productos

Método: GET

URL:

```text
http://localhost:3000/api/productos
```

Esta solicitud es pública y devuelve los productos registrados en MongoDB.

## 10. Pruebas realizadas con Postman

Durante el desarrollo se realizaron pruebas de las principales funcionalidades de la API.

| Prueba | Resultado esperado |
|--------|-------------------|
| Registro de usuario válido | 201 Created |
| Inicio de sesión correcto | 200 OK |
| Registro con correo duplicado | 409 Conflict |
| Inicio de sesión incorrecto | 401 Unauthorized |
| Consultar productos | 200 OK |
| Crear producto sin token | 401 Unauthorized |
| Crear producto como administrador | 201 Created |
| Actualizar producto como administrador | 200 OK |
| Eliminar producto como administrador | 200 OK |
| Crear producto como usuario normal | 403 Forbidden |

Las pruebas permitieron comprobar la comunicación entre Postman, Express y MongoDB, además del funcionamiento de las restricciones de seguridad.

## 11. Persistencia de datos

MongoDB almacena los registros utilizados por la aplicación.

Base de datos:

```text
catalogo_api
```

Colecciones comprobadas:

- usuarios: almacena información de las cuentas registradas, contraseñas cifradas y roles.
- productos: almacena los productos con nombre, descripción, categoría y precio.

La información puede visualizarse utilizando MongoDB Compass.

## 12. Resultados obtenidos

Se implementó una API REST capaz de registrar usuarios, autenticar mediante JWT y administrar productos, utilizando una base de datos MongoDB.

Las pruebas realizadas con Postman permitieron comprobar las respuestas HTTP, la creación y modificación de registros, la eliminación de productos y la aplicación de permisos según el rol del usuario.

También se verificó la persistencia de información mediante MongoDB Compass.

## 13. Consideraciones de seguridad

- No publicar el archivo `.env`.
- No compartir contraseñas reales ni tokens JWT.
- Utilizar claves seguras para JWT_SECRET.
- Mantener la carpeta `node_modules` fuera del repositorio.
- No asignar permisos de administrador mediante el registro público.
- Utilizar credenciales de prueba para las demostraciones.

## 14. Conclusión

El desarrollo de CatalogoAPI permitió aplicar los fundamentos de creación de servicios REST mediante Node.js y Express, integrando MongoDB como mecanismo de persistencia y JWT para la autenticación de usuarios.

Las operaciones CRUD y las pruebas realizadas demostraron la importancia de validar las solicitudes, proteger los recursos administrativos y verificar los cambios almacenados en la base de datos.

El proyecto constituye una base funcional que puede ampliarse posteriormente mediante una interfaz frontend y nuevas funcionalidades.
