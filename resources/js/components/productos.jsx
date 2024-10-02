import React, { useState } from 'react';
import '../../css/productos.css';

const Productos = () => {
    const [showForm, setShowForm] = useState(false);
    const [filters, setFilters] = useState({ nombre: '', categoria: '' });

    const productos = [
        { nombre: 'Sofá 350 cm de largo - 500 cm de ancho', descripcion: 'Sofá de gran tamaño', precioCompra: 40000, precioVenta: 50000, stock: 1000, categoria: 'Muebles' },
        { nombre: 'Samsung Galaxy A100', descripcion: 'Celular Samsung', precioCompra: 40000, precioVenta: 50000, stock: 100, categoria: 'Celulares' },
        { nombre: 'Sofá 350 cm de largo - 500 cm de ancho', descripcion: 'Sofá de gran tamaño', precioCompra: 40000, precioVenta: 50000, stock: 1000, categoria: 'Muebles' },
        { nombre: 'Samsung Galaxy A100', descripcion: 'Celular Samsung', precioCompra: 40000, precioVenta: 50000, stock: 100, categoria: 'Celulares' },
        { nombre: 'Sofá 350 cm de largo - 500 cm de ancho', descripcion: 'Sofá de gran tamaño', precioCompra: 40000, precioVenta: 50000, stock: 1000, categoria: 'Muebles' },
    ];

    const filteredProductos = productos.filter(producto => 
        producto.nombre.toLowerCase().includes(filters.nombre.toLowerCase()) &&
        (filters.categoria === '' || producto.categoria === filters.categoria)
    );

    const handleNewProductClick = () => {
        setShowForm(true);
    };

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes manejar la lógica para crear un nuevo producto
        console.log("Producto creado");
    };

    return (
        <div className="productos-container">
            {showForm ? (
                <div className="create-product-form">
                    <h2>Create Productos</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <br />
                                <label>Nombre*</label>
                                <input type="text" required />
                            </div>
                            <div className="form-group">
                                <br />
                                <label>Descripción*</label>
                                <input type="text" required />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Precio Compra*</label>
                                <input type="number" required />
                            </div>
                            <div className="form-group">
                                <label>Precio Venta*</label>
                                <input type="number" required />
                            </div>
                            <div className="form-group">
                                <label>Stock*</label>
                                <input type="number" required />
                            </div>
                            <div className="form-group">
                                <label>Categorías*</label>
                                <select required>
                                    <option value="">Select an option</option>
                                    <option value="Muebles">Muebles</option>
                                    <option value="Celulares">Celulares</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-buttons">
                            <button type="submit" className="create-button">Create</button>
                            <button type="button" className="cancel-button" onClick={() => setShowForm(false)}>Cancel</button>
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
                                    <td>{producto.precioCompra.toLocaleString()}</td>
                                    <td>{producto.precioVenta.toLocaleString()}</td>
                                    <td>{producto.stock}</td>
                                    <td>
                                        <button className="edit-button">Edit</button>
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