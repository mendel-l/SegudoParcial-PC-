# SEGUNDO PARCIAL DE PROGRA COMERCIAL
## FRONT-END
para instalar los componentes del proeycto: npx create-react-app my-app
nos dirigimos a: cd my-app
para correr el proyecto: npm start

en caso de problemas ejecutar: npm install react-router-dom


## Estructura del proyecto
my-app/
├── node_modules/
├── public/
├── src/
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── ...
└── package.json





## BACK-END
para  los componentes del proeycto: npm i || npm install
para correr el proyecto: npm start

### aqui se enlistaran todas las peticiones y cuerpo JSON que se usaron:
## EMPLEADOS
1. GET
http://localhost:3001/productos
http://localhost:3001/productos/{id}

2. POST
http://localhost:3001/productos

{
  "nombre": "Producto 1",
  "descripcion": "Descripción del producto 1",
  "precio": 100.50,
  "stock": 20,
  "categoria": "categoria 1",
  "proveedor": "proveedor 1"
}


3. PUT
http://localhost:3001/productos/{id}

{
  "nombre": "Producto edit",
  "descripcion": "Descripción edit",
  "precio": 100.50,
  "stock": 20,
  "categoria": "categoria edit",
  "proveedor": "proveedor edit"
}

4. DELETE
http://localhost:3001/productos/{id}



## PARA PRUEBAS UNITARIAS
npm install --save-dev jest

Agrega el siguiente script al package.json para correr Jest:
"scripts": {
  "test": "jest"
}


Creamos una prueba unitaria para un controlador en productosController.js

// productosController.js
exports.getAll = (req, res) => {
  const productos = [
    { id: 1, nombre: 'Producto 1', precio: 100 },
    { id: 2, nombre: 'Producto 2', precio: 200 },
  ];

  res.status(200).json(productos);
};

Creamos un archivo llamado productosController.test.js en la carpeta de pruebas:

