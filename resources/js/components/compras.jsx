import React, { useState } from 'react';
import '../../css/compras.css'; // Asegúrate de tener un archivo CSS correcto

const Compras = () => {
    const [showForm, setShowForm] = useState(false);
    const [filters, setFilters] = useState({ idProducto: '', idProveedor: '' });

    const productos = [
        { id: 1, nombre: 'Sofá 350 cm de largo' },
        { id: 2, nombre: 'Samsung Galaxy A100' },
    ];

    const proveedores = [
        { id: 1, nombre: 'Proveedor A' },
        { id: 2, nombre: 'Proveedor B' },
    ];

    const [compras, setCompras] = useState([
        {
            idProducto: 1,
            idProveedor: 1,
            cantidad: 2,
            precioCompra: 100000,
            valorUnitario: 50000,
            soporteCompra: 'Factura #001',
        },
        {
            idProducto: 1,
            idProveedor: 1,
            cantidad: 2,
            precioCompra: 100000,
            valorUnitario: 50000,
            soporteCompra: 'Factura #001',
        },
        {
            idProducto: 1,
            idProveedor: 1,
            cantidad: 2,
            precioCompra: 100000,
            valorUnitario: 50000,
            soporteCompra: 'Factura #001',
        },
        {
            idProducto: 1,
            idProveedor: 1,
            cantidad: 2,
            precioCompra: 100000,
            valorUnitario: 50000,
            soporteCompra: 'Factura #001',
        },
        {
            idProducto: 1,
            idProveedor: 1,
            cantidad: 2,
            precioCompra: 100000,
            valorUnitario: 50000,
            soporteCompra: 'Factura #001',
        },
    ]); // Estado para almacenar las compras con un registro inicial

    const handleNewCompraClick = () => {
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
        // Aquí puedes manejar la lógica para crear una nueva compra
        console.log("Compra creada");
        // Resetea el formulario
        setShowForm(false);
    };

    return (
        <div className="compras-container">
            {showForm ? (
                <div className="create-compra-form">
                    <h2>Create Compras</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <br />
                                <label>Id Producto*</label>
                                <select name="idProducto" required>
                                    <option value="">Select an option</option>
                                    {productos.map(producto => (
                                        <option key={producto.id} value={producto.id}>{producto.nombre}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <br />
                                <label>Id Proveedor*</label>
                                <select name="idProveedor" required>
                                    <option value="">Select an option</option>
                                    {proveedores.map(proveedor => (
                                        <option key={proveedor.id} value={proveedor.id}>{proveedor.nombre}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Cantidad*</label>
                                <input type="number" required />
                            </div>
                            <div className="form-group">
                                <label>Precio Compra*</label>
                                <input type="number" required />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Valor Unitario*</label>
                                <input type="number" required />
                            </div>
                            <div className="form-group">
                                <label>Soporte Compra*</label>
                                <input type="text" required />
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
                        <h2>Compras</h2>
                        <button className="new-compra-button" onClick={handleNewCompraClick}>New Compras</button>
                    </div>
                    <div className="filters">
                        <input
                            type="text"
                            name="idProducto"
                            placeholder="Filtrar por ID Producto"
                            value={filters.idProducto}
                            onChange={handleFilterChange}
                        />
                        <input
                            type="text"
                            name="idProveedor"
                            placeholder="Filtrar por ID Proveedor"
                            value={filters.idProveedor}
                            onChange={handleFilterChange}
                        />
                    </div>
                    <table className="compras-table">
                        <thead>
                            <tr>
                                <th>Id Producto</th>
                                <th>Id Proveedor</th>
                                <th>Cantidad</th>
                                <th>Precio Compra</th>
                                <th>Valor Unitario</th>
                                <th>Soporte Compra</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {compras.filter(compra =>
                                (filters.idProducto === '' || compra.idProducto.toString().includes(filters.idProducto)) &&
                                (filters.idProveedor === '' || compra.idProveedor.toString().includes(filters.idProveedor))
                            ).map((compra, index) => (
                                <tr key={index}>
                                    <td>{compra.idProducto}</td>
                                    <td>{compra.idProveedor}</td>
                                    <td>{compra.cantidad}</td>
                                    <td>{compra.precioCompra.toLocaleString()}</td>
                                    <td>{compra.valorUnitario.toLocaleString()}</td>
                                    <td>{compra.soporteCompra}</td>
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

export default Compras;