import React, { useState, useEffect } from 'react';

function ProductsTable() {
  const [productos, setProductos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false); // Estado para mostrar el formulario
  const [editingProduct, setEditingProduct] = useState(null); // Estado para el producto que se está editando

  // Estados para los campos del formulario
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [categoria, setCategoria] = useState('');
  const [proveedor, setProveedor] = useState('');

  // Función para obtener los productos de la API
  useEffect(() => {
    fetch('http://localhost:3001/productos')
      .then(response => response.json())
      .then(data => setProductos(data))
      .catch(error => console.error('Error:', error));
  }, []);

  // Función para recargar la lista de productos después de una edición o creación
  const loadProductos = () => {
    fetch('http://localhost:3001/productos')
      .then(response => response.json())
      .then(data => setProductos(data))
      .catch(error => console.error('Error al cargar los productos:', error));
  };

  // Función para manejar el envío del formulario
  const handleCreateOrUpdateProduct = (e) => {
    e.preventDefault();

    const nuevoProducto = {
      nombre,
      descripcion,
      precio,
      stock,
      categoria,
      proveedor
    };

    if (editingProduct) {
      // Si hay un producto en edición, hacer PUT para actualizar
      fetch(`http://localhost:3001/productos/${editingProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoProducto),
      })
      .then(response => response.json())
      .then(() => {
        // Después de actualizar, recargar los productos
        loadProductos();
        setEditingProduct(null);
        setShowForm(false); // Ocultar el formulario después de editar
        resetForm();
      })
      .catch(error => console.error('Error al actualizar el producto:', error));
    } else {
      // Si no hay producto en edición, hacer POST para crear
      fetch('http://localhost:3001/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoProducto),
      })
      .then(response => response.json())
      .then(data => {
        setProductos([...productos, data]);
        setShowForm(false); // Ocultar el formulario después de crear el producto
        resetForm();
      })
      .catch(error => console.error('Error al crear el producto:', error));
    }
  };

  // Función para manejar la edición del producto
  const handleEdit = (producto) => {
    setEditingProduct(producto);
    setNombre(producto.nombre);
    setDescripcion(producto.descripcion);
    setPrecio(producto.precio);
    setStock(producto.stock);
    setCategoria(producto.categoria);
    setProveedor(producto.proveedor);
    setShowForm(true); // Mostrar el formulario para editar
  };

  // Función para eliminar un producto
  const handleDelete = (productoId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      fetch(`http://localhost:3001/productos/${productoId}`, {
        method: 'DELETE',
      })
      .then(() => {
        // Después de eliminar, recargar la lista de productos
        loadProductos();
      })
      .catch(error => console.error('Error al eliminar el producto:', error));
    }
  };

  // Función para resetear el formulario
  const resetForm = () => {
    setNombre('');
    setDescripcion('');
    setPrecio('');
    setStock('');
    setCategoria('');
    setProveedor('');
  };

  // Filtrar productos por nombre o precio
  const productosFiltrados = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    producto.precio.toString().includes(searchTerm)
  );

  return (
    <div>
      <h2>Lista de Productos</h2>
      
      {/* Botón para crear producto */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar por nombre o precio..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-success" onClick={() => { 
          setShowForm(!showForm); 
          resetForm();
          setEditingProduct(null);
        }}>
          {showForm ? 'Cancelar' : 'Crear Producto'}
        </button>
      </div>

      {/* Formulario para crear o editar producto */}
      {showForm && (
        <form className="create-product-form" onSubmit={handleCreateOrUpdateProduct}>
          <div>
            <label>Nombre:</label>
            <input type="text" name="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          </div>
          <div>
            <label>Descripción:</label>
            <input type="text" name="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
          </div>
          <div>
            <label>Precio:</label>
            <input type="number" name="precio" step="0.01" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
          </div>
          <div>
            <label>Stock:</label>
            <input type="number" name="stock" value={stock} onChange={(e) => setStock(e.target.value)} required />
          </div>
          <div>
            <label>Categoría:</label>
            <input type="text" name="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)} required />
          </div>
          <div>
            <label>Proveedor:</label>
            <input type="text" name="proveedor" value={proveedor} onChange={(e) => setProveedor(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary">
            {editingProduct ? 'Actualizar Producto' : 'Guardar Producto'}
          </button>
        </form>
      )}

      {/* Tabla de productos */}
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Categoría</th>
            <th>Proveedor</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productosFiltrados.map(producto => (
            <tr key={producto.id}>
              <td>{producto.nombre}</td>
              <td>{producto.descripcion}</td>
              <td>${producto.precio}</td>
              <td>{producto.stock}</td>
              <td>{producto.categoria}</td>
              <td>{producto.proveedor}</td>
              <td>
                <button className="btn btn-warning" onClick={() => handleEdit(producto)}>Editar</button>
                <button className="btn btn-danger" onClick={() => handleDelete(producto.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsTable;
