import React, { useState } from 'react';
import '../../css/ventas.css'; // Asegúrate de tener un archivo CSS correcto

const Ventas = () => {
    const [showForm, setShowForm] = useState(false);
    const [filters, setFilters] = useState({ idProducto: '', idCliente: '' });

    const productos = [
        { id: 1, nombre: 'Sofá 350 cm de largo' },
        { id: 2, nombre: 'Samsung Galaxy A100' },
    ];

    const clientes = [
        { id: 1, nombre: 'Cliente A' },
        { id: 2, nombre: 'Cliente B' },
    ];

    const [ventas, setVentas] = useState([
        {
            idProducto: 1,
            idCliente: 1,
            cantidad: 1,
            precioVenta: 150000,
            valorUnitario: 150000,
            soporteCompra: 'Factura #101',
        },
        {
            idProducto: 2,
            idCliente: 1,
            cantidad: 2,
            precioVenta: 200000,
            valorUnitario: 100000,
            soporteCompra: 'Factura #102',
        },
        {
            idProducto: 1,
            idCliente: 2,
            cantidad: 1,
            precioVenta: 160000,
            valorUnitario: 160000,
            soporteCompra: 'Factura #103',
        },
        {
            idProducto: 2,
            idCliente: 2,
            cantidad: 1,
            precioVenta: 180000,
            valorUnitario: 180000,
            soporteCompra: 'Factura #104',
        },
        {
            idProducto: 1,
            idCliente: 1,
            cantidad: 3,
            precioVenta: 450000,
            valorUnitario: 150000,
            soporteCompra: 'Factura #105',
        },
    ]); // Estado para almacenar las ventas con 5 registros iniciales

    const handleNewVentaClick = () => {
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
        // Aquí puedes manejar la lógica para crear una nueva venta
        console.log("Venta creada");
        // Resetea el formulario
        setShowForm(false);
    };

    return (
        <div className="ventas-container">
            {showForm ? (
                <div className="create-venta-form">
                    <h2>Create Ventas</h2>
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
                                <label>Id Cliente*</label>
                                <select name="idCliente" required>
                                    <option value="">Select an option</option>
                                    {clientes.map(cliente => (
                                        <option key={cliente.id} value={cliente.id}>{cliente.nombre}</option>
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
                                <label>Precio Venta*</label>
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
                        <h2>Ventas</h2>
                        <button className="new-venta-button" onClick={handleNewVentaClick}>New Ventas</button>
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
                            name="idCliente"
                            placeholder="Filtrar por ID Cliente"
                            value={filters.idCliente}
                            onChange={handleFilterChange}
                        />
                    </div>
                    <table className="ventas-table">
                        <thead>
                            <tr>
                                <th>Id Producto</th>
                                <th>Id Cliente</th>
                                <th>Cantidad</th>
                                <th>Precio Venta</th>
                                <th>Valor Unitario</th>
                                <th>Soporte Compra</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ventas.filter(venta =>
                                (filters.idProducto === '' || venta.idProducto.toString().includes(filters.idProducto)) &&
                                (filters.idCliente === '' || venta.idCliente.toString().includes(filters.idCliente))
                            ).map((venta, index) => (
                                <tr key={index}>
                                    <td>{venta.idProducto}</td>
                                    <td>{venta.idCliente}</td>
                                    <td>{venta.cantidad}</td>
                                    <td>{venta.precioVenta.toLocaleString()}</td>
                                    <td>{venta.valorUnitario.toLocaleString()}</td>
                                    <td>{venta.soporteCompra}</td>
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

export default Ventas;