const { Router } = require('express');
const router = Router();
const ProductosController = require('../controllers/productosController');

// Rutas para productos
router.get('/productos', ProductosController.getAll);
router.get('/productos/:id', ProductosController.getById);
router.post('/productos', ProductosController.create);
router.put('/productos/:id', ProductosController.update);
router.delete('/productos/:id', ProductosController.delete);

module.exports = (app) => {
    app.use('/', router);
};
