-- Crear la base de datos "parcial2"
CREATE DATABASE IF NOT EXISTS parcial2;
USE parcial2;

-- Crear la tabla "productos"
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    categoria VARCHAR(100),
    proveedor VARCHAR(100)
);

-- Datos iniciales (opcional)
INSERT INTO productos (nombre, descripcion, precio, stock, categoria, proveedor)
VALUES 
('Producto 1', 'Descripción del producto 1', 19.99, 100, 'Electrónica', 'Proveedor A'),
('Producto 2', 'Descripción del producto 2', 29.99, 50, 'Hogar', 'Proveedor B'),
('Producto 3', 'Descripción del producto 3', 15.99, 150, 'Juguetes', 'Proveedor C');
