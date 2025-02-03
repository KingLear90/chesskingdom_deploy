<h1>Trabajo final UTN (MERN stack (MongoDB, Express, React, Node.js))- Diplomatura Web Full Stack, 2024 <img src="https://user-images.githubusercontent.com/74038190/216120981-b9507c36-0e04-4469-8e27-c99271b45ba5.png" width="30px"></h1>

<h3>Descripción del proyecto</h3>
[<B>ACLARACIÓN PREVIA:</B> La sección del front, aunque incompleta y con posibilidad de mejoras varias, dispone de su propio README para utilizar la sección /learn].<br>
<br>
El siguiente trabajo está basado en una <b>API Rest</b> desarrollada como parte final de la Diplomatura Full Stack en Desarrollo Web, de la <b>Universidad Tecnológica Nacional (UTN)</b>.<br>

La aplicación realiza actividades CRUD (create, read, update, delete) sobre usuarios (users), productos (products) y categorías (categories) a partir de sus respectivos endpoints.<br>

El proyecto realiza de manera completa el CRUD en el backend, y por el momento realiza sólo algunas acciones desde el frontend (crear (y loguear), ver y eliminar usuarios; y ver, editar y eliminar productos).

<h3>Tecnologías implementadas</h3>

En el backend: 
- Node.js
- Express
- MongoDB
- Mongoose
- crypto
- bcryptjs
- jsonwebtoken
- dotenv
- nodemon

En el frontend: <br>
(Señaladas con ** aplican especialmente a este tp, el resto a todo el sitio en general)
- React **
- Typescript ** 
- React-router-dom **
- React-hook-form **
- Material UI ** 
- Material UI Icons** 
- chess.js
- react-chessboard
- react-confetti-explosion

<h3>🚀 Pasos para correr el proyecto</h3>

1. Clonar el proyecto: <br>
```bash
  git clone https://github.com/KingLear90/CRUD---final-UTN-.git
```
2. Instalar dependencias backend
```bash
  cd back
  npm install
```
3. Instalar dependencias frontend
```bash
  cd front
  npm install
```
3. Configurar variables de entorno:<br>
   Es necesario crear un archivo .env en la raiz del proyecto (/back). Por ejemplo: 
```bash
  PORT = 3001
  MONGODB_URI = "mongodb://localhost:27017/[NOMBRE DE LA BASE DE DATOS]"
  SECRET = "secret" || "457fc9106c2d19dbb10baf289263269da7289931277401b31f68e0138cbeab1dc2ae2723a1d50195d8654bc47550d0e354aaf100790856ae3de3f56079095df4" 
  //[En back/src/utils hay un archivo llamado randomKeys.js que utiliza el módulo crypto, una librería que ayuda, en este caso, a generar claves random]
  //[Para ejecutar randomKeys.js, abrir el archivo en una Terminal Integrada, y ejecutarlo mediante node randomKeys.js. De lo contrario, se puede usar cualquier string como "secret" o el que se desee]
```
4. Correr la aplicación:<br>
  Comenzar el servidor backend:
```bash
  cd back
  npm run dev
```
Comenzar el servidor front:
```bash
  cd front
  npm run dev
```
<h3>API Endpoints</h3>
Autenticación: <br>
<b>POST /api/user/login</b> - <i>Login de usuario</i><br>
<b>POST /api/user/create</b> - <i>Crear un nuevo usuario</i><br>
<br>

Users: <br>
**GET /api/user/get** - _Obtener/mostrar todos los usuarios<br>
**POST /api/user/get-by-id/:id** - _Obtener/mostrar un usuario específico a través de su ID_<br>
**PUT /api/user/update/:id** - _Actualizar usuario_<br>
**DELETE /api/user/delete/:id** - _Borrar producto por su ID_<br>

Products: <br>
**GET /api/product/get** - _Obtener/mostrar todos los productos_<br>
**POST /api/product/get-by-id/:id** - _Obtener/mostrar un producto específico a través de su ID_<br>
**POST /api/product/create** - _Crear nuevo producto_<br>
**PUT /api/product/update/:id** - _Actualizar producto_<br>
**DELETE /api/product/delete/:id** - _Borrar producto_<br>

Categories: <br>
**GET /api/category/get** - _Obtener/mostrar todas las categorías_<br>
**POST /api/category/get-by-id/:id** - _Obtener/mostrar una categoría específica a través de su ID_<br>
**POST /api/category/create** - _Crear nueva categoría_<br>
**PUT /api/category/update/:id** - _Actualizar categoría_<br>
**DELETE /api/category/delete/:id** - _Borrar categoría_<br>
<br>

<h3>Ejemplo de solicitudes:</h3>
- <b>CREAR USUARIO</b> (<b>POST http://localhost:3001/api/user/create</b>)<br>
{<br>
    "name": "Melissa",<br>
    "email": "test1@gmail.com",<br>
    "password": "Test01",<br>
    "profile": "admin"<br>
},<br>
{<br>
    "name": "Alejandro",<br>
    "email": "test2@gmail.com",<br>
    "password": "Test02",<br>
    "profile": "employee"<br>
},<br>
// <b>El siguiente es un ejemplo sin "profile" definido: si no se especifica, el sistema lo genera por defecto como "user".</b><br>
// <b>Sería el caso en el que un usuario visita el sitio (frontend) y se crea una cuenta.</b><br>
// (<b>Si el usuario creado es definido mediante "profile": "admin", al loguearse en el front es redigirido a /users, donde puede ver todos los usuarios creados hasta el momento y eliminar alguno o todos si lo desea.</b>)<br>
{<br>
    "name": "Verónica",<br>
    "email": "test3@gmail.com",<br>				
    "password": "Test03"<br>						 
},<br>
{<br>
    "name": "Jorge",<br>
    "email": "test4@gmail.com",<br>
    "password": "Test04",<br>
    "profile": "user"<br>
},<br>
{<br>
    "name": "Vanesa",<br>
    "email": "test5@gmail.com",<br>
    "password": "Test05",<br>
    "profile": "user"<br>
},<br>
<br>
- <b>INICIAR SESIÓN</b> (<b>POST http://localhost:3001/api/user/login</b>)<br>
<br>
{
	"email": "test1@gmail.com",
 	"password": "Test01"
}<br>
{
	"email": "test2@gmail.com",
 	"password": "Test02"
}<br>
{
	"email": "test3@gmail.com",
 	"password": "Test03"
}<br>
<br>

<h4>EJEMPLO CON EL FRONT</h4>
Si se accede desde el front a la sección <b>Iniciar Sesión</b>, y se ingresa por ejemplo con "email": "test1@gmail.com" y "password": "Test01", se verá durante unos segundos un mensaje de Bienvenida al administrador/a, tras lo cual se es redirigido a /users (ruta protegida a la que solo se accede si se loguea un usuario con perfil "admin").<br>

![image](https://github.com/user-attachments/assets/2ccc139f-213a-41e4-8db1-44bd2315d9b9)

<span>El botón de <b><i>eliminar</i></b> funciona sobre cualquier tipo de perfil, excepto sobre quienes sean "admin".</span><br>

<span>Intentar acceder a <i>http://localhost:5173/users</i>, sin haber previamente iniciado sesión como "admin", redirige automáticamente al login para iniciar sesión.</span><br>

<h5>Otras acciones con usuarios</h5>
<i>GET http://localhost:3001/api/user/get</i> <br>
<i>POST http://localhost:3001/api/user/get-by-id/:id</i> <br>
<i>PUT http://localhost:3001/api/user/update:id</i> <br>
<i>DELETE http://localhost:3001/api/user/delete/:id</i> <br>
<br>
- <b>CREAR PRODUCTOS</b> (<b>POST http://localhost:3001/api/product/create</b>)<br>
[En "category_id", por medio de <b>.populate()</b> se permite identificar el nombre de la categoría a la que el producto corresponde]. <br>
<br>
{<br>
    "productName": "Piezas de ajedrez de metal",<br>
    "price": "80500",<br>
    "url": "https://cdn.shopify.com/s/files/1/0287/0634/0912/products/0_715451a3-d557-424b-92cd-39130adcdec9_1800x1800.jpg?v=1667280756",<br>
    "description": "Obra de arte tribal. Juego de ajedrez de lujo.",<br>        
    "category_id": (string, _id de la categoría generado por Mongo)<br>
},<br>
{<br>
    "productName": "Fuego en el tablero",<br>
    "price": "21500",<br>
    "url": "https://images.cdn2.buscalibre.com/fit-in/360x360/2e/d3/2ed3ef3ea549c5cbe7390a12ee1e18f7.jpg",<br>
    "description": "un libro lleno de creatividad y emocionantes partidas del propio autor.",<br>
    "category_id": (string, _id de la categoría generado por Mongo)<br>
},<br>
{<br>
    "productName": "Reloj de ajedrez de madera Turnier - (madera clara)",<br>
    "price": "125000",<br>
    "url": "https://mychessets.com/cdn/shop/collections/image.png?v=1713137875",<br>
    "description": "Reloj de ajedrez tradicional de madera con mecanismo de cuerda - fabricado en europa por bhb.",<br>
    "category_id": (string, _id de la categoría generado por Mongo)<br> 
},<br>

<h5>Otras acciones con productos</h5>
<i>GET http://localhost:3001/api/product/get</i> <br>
<i>POST http://localhost:3001/api/product/get-by-id/:id</i> <br>
<i>PUT http://localhost:3001/api/product/update:id</i> <br>
<i>DELETE http://localhost:3001/api/product/delete/:id</i> <br>
<br>
- <b>CREAR CATEGORÍA</b> (<b>POST http://localhost:3001/api/category/create</b>)<br>
{
	"categoryName" : "chessboards"
},<br>
{
	"categoryName" : "books"
},<br>
{
	"categoryName" : "chess clocks"
},<br>

<h5>Otras acciones con categorías</h5>
<i>GET http://localhost:3001/api/category/get</i> <br>
<i>POST http://localhost:3001/api/category/get-by-id/:id</i> <br>
<i>PUT http://localhost:3001/api/category/update:id</i> <br>
<i>DELETE http://localhost:3001/api/category/delete/:id</i> <br>
<br>
<h3>Información adicional: Estructura del proyecto</h3>
/back<br>
  -->/src <br>
    ---->/controllers <br>
    ---->/models <br>
    ---->/routes <br>
    ---->/middleware <br>
    ---->/server.js <br>
<br>
/front<br>
  -->/src <br>
    ---->/components<br>
    ---->/pages <br>
    ---->/utils <br>
    ---->/types <br>
    ---->App.tsx <br>
    ---->main.tsx <br>
