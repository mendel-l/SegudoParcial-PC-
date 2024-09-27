const { getAll } = require('../controllers/productosController');

describe('productosController', () => {
  // Simulamos el objeto req y res
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  test('getAll debe devolver un array de productos', () => {
    getAll(req, res);

    // Comprobamos que res.status fue llamado con 200
    expect(res.status).toHaveBeenCalledWith(200);
    // Comprobamos que res.json fue llamado con los productos esperados
    expect(res.json).toHaveBeenCalledWith([
      { id: 1, nombre: 'Producto 1', precio: 100 },
      { id: 2, nombre: 'Producto 2', precio: 200 },
    ]);
  });
});
