import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/productos.css';

const Productos = () => {
    const [showForm, setShowForm] = useState(false);
    const [filters, setFilters] = useState({ nombre: '', categoria: '' });
    const [productos, setProductos] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        // Cargar productos al montar el componente
        const fetchProductos = async () => {
            const response = await axios.get('/api/productos'); // Cambia la URL según tu configuración
            setProductos(response.data);
        };
        fetchProductos();
    }, []);

    const filteredProductos = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(filters.nombre.toLowerCase()) &&
        (filters.categoria === '' || producto.categoria === filters.categoria)
    );

    const handleNewProductClick = () => {
        setShowForm(true);
    };

    const handleEdit = (producto) => {
        setEditingProduct(producto);
        setShowForm(true);
    };

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            nombre: formData.get('nombre'),
            descripcion: formData.get('descripcion'),
            precio_de_compra: parseInt(formData.get('precioCompra'), 10),
            precio_de_venta: parseInt(formData.get('precioVenta'), 10),
        };

        try {
            if (editingProduct) {
                // Actualizar producto
                const response = await axios.put(`/api/productos/${editingProduct.id}`, data);
                console.log("Producto actualizado", response.data);
            } else {
                // Crear nuevo producto
                const response = await axios.post('/api/productos', data);
                console.log("Producto creado", response.data);
            }
            setShowForm(false);
            setEditingProduct(null); // Resetea el producto en edición
            // Aquí puedes agregar lógica para actualizar la lista de productos o mostrar un mensaje
        } catch (error) {
            console.error("Error creando o actualizando el producto:", error.response.data);
            // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/productos/${id}`);
            setProductos(productos.filter(producto => producto.id !== id));
        } catch (error) {
            console.error("Error deleting proveedor:", error);
        }
    };

    return (
        <div className="productos-container">
            {showForm ? (
                <div className="create-product-form">
                    <h2>{editingProduct ? "Edit Product" : "Create Product"}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Nombre*</label>
                                <input type="text" name="nombre" defaultValue={editingProduct ? editingProduct.nombre : ''} required />
                            </div>
                            <div className="form-group">
                                <label>Descripción*</label>
                                <input type="text" name="descripcion" defaultValue={editingProduct ? editingProduct.descripcion : ''} required />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Precio Compra*</label>
                                <input type="number" name="precioCompra" defaultValue={editingProduct ? editingProduct.precio_de_compra : ''} required />
                            </div>
                            <div className="form-group">
                                <label>Precio Venta*</label>
                                <input type="number" name="precioVenta" defaultValue={editingProduct ? editingProduct.precio_de_venta : ''} required />
                            </div>
                        </div>
                        <div className="form-buttons">
                            <button type="submit" className="create-button">
                                {editingProduct ? "Editar" : "Crear"}
                            </button>
                            <button
                                type="button"
                                className="cancel-button"
                                onClick={() => {
                                    setShowForm(false);
                                    setEditingProduct(null); // Restablecer el producto en edición
                                }}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <>
                    <div className="header">
                        <h2>Productos</h2>
                        <button className="new-product-button" onClick={handleNewProductClick}>New productos</button>
                    </div>
                    <div className="filters">
                        <input
                            type="text"
                            name="nombre"
                            placeholder="Filtrar por nombre"
                            value={filters.nombre}
                            onChange={handleFilterChange}
                        />
                        <select
                            name="categoria"
                            value={filters.categoria}
                            onChange={handleFilterChange}
                        >
                            <option value="">Todas las categorías</option>
                            <option value="Muebles">Muebles</option>
                            <option value="Celulares">Celulares</option>
                        </select>
                    </div>
                    <table className="productos-table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Precio Compra</th>
                                <th>Precio Venta</th>
                                <th>Stock</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProductos.map((producto, index) => (
                                <tr key={index}>
                                    <td>{producto.nombre}</td>
                                    <td>{producto.descripcion}</td>
                                    <td>{producto.precio_de_compra.toLocaleString()}</td>
                                    <td>{producto.precio_de_venta.toLocaleString()}</td>
                                    <td>{producto.stock}</td>
                                    <td>
                                    <button className="edit-button" onClick={() => handleEdit(producto)}>Edit</button>
                                        <button className="delete-button" onClick={() => handleDelete(producto.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default Productos;
