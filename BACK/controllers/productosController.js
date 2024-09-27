'use strict';

const db = require('../models');
const Productos = db.Producto;

/* PARA PRUEBA UNITARIA */
exports.getAll = (req, res) => {
    const productos = [
      { id: 1, nombre: 'Producto 1', precio: 100 },
      { id: 2, nombre: 'Producto 2', precio: 200 },
    ];
  
    res.status(200).json(productos);
  };
  

function getFormattedDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Meses comienzan desde 0
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


module.exports = {
    // GET ALL
    async getAll(req, res) {
        try {
            const productos = await Productos.findAll();

            // Formatear la fecha de creación de cada producto
            const productosFormateados = productos.map(producto => {
                return {
                    ...producto.toJSON(),
                    fecha_creacion: new Date(producto.fecha_creacion).toLocaleString('en-GB', { 
                        year: 'numeric', 
                        month: '2-digit', 
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: false
                    }).replace(',', '')
                };
            });

            res.status(200).json(productosFormateados);
        } catch (error) {
            console.error('Error al obtener los productos:', error);
            res.status(500).json({ error: 'Error al obtener los productos' });
        }
    },

    // GET ID
    async getById(req, res) {
        try {
            const productoId = req.params.id;
            const producto = await Productos.findByPk(productoId);

            if (!producto) {
                return res.status(404).json({ error: 'Producto no encontrado' });
            }

            // Formatear la fecha de creación del producto
            const productoFormateado = {
                ...producto.toJSON(),
                fecha_creacion: new Date(producto.fecha_creacion).toLocaleString('en-GB', { 
                    year: 'numeric', 
                    month: '2-digit', 
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false
                }).replace(',', '')
            };

            res.status(200).json(productoFormateado);
        } catch (error) {
            console.error('Error al obtener el producto:', error);
            res.status(500).json({ error: 'Error al obtener el producto' });
        }
    },

    // POST
    async create(req, res) {
        try {
            const { nombre, descripcion, precio, stock, categoria, proveedor } = req.body;
            
            // Generar la fecha actual en el formato deseado (YYYY-MM-DD HH:mm:ss)
            const fecha_creacion = getFormattedDate();

            const nuevoProducto = await Productos.create({
                nombre,
                descripcion,
                precio,
                stock,
                categoria,
                proveedor,
                fecha_creacion
            });

            res.status(201).json(nuevoProducto);
        } catch (error) {
            console.error('Error al crear un nuevo producto:', error);
            res.status(500).json({ error: 'Error al crear un nuevo producto' });
        }
    },

    // PUT
    async update(req, res) {
        try {
            const id = req.params.id;
            const { nombre, descripcion, precio, stock, categoria, proveedor } = req.body;
            const producto = await Productos.findByPk(id);

            if (!producto) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }

            // Actualizar la fecha de actualización
            const fecha_actualizacion = getFormattedDate();

            producto.nombre = nombre || producto.nombre;
            producto.descripcion = descripcion || producto.descripcion;
            producto.precio = precio || producto.precio;
            producto.stock = stock || producto.stock;
            producto.categoria = categoria || producto.categoria;
            producto.proveedor = proveedor || producto.proveedor;
            producto.fecha_creacion = fecha_actualizacion; // Actualiza la fecha si es necesario

            await producto.save();

            res.status(200).json({ message: 'Producto actualizado correctamente', producto });
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
            res.status(500).json({ error: 'Error al actualizar el producto' });
        }
    },

    // DELETE
    async delete(req, res) {
        try {
            const id = req.params.id;
            const producto = await Productos.findByPk(id);

            if (!producto) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }

            const productoEliminado = {
                id: producto.id,
                nombre: producto.nombre,
                descripcion: producto.descripcion
            };

            await producto.destroy();

            res.status(200).json({ message: 'Producto eliminado correctamente', deletedProducto: productoEliminado });
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
            res.status(500).json({ error: 'Error al eliminar el producto' });
        }
    }
};
