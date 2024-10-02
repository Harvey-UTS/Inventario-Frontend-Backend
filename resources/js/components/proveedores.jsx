import React, { useState } from 'react';
import '../../css/proveedores.css';

const Proveedores = () => {
    const [showForm, setShowForm] = useState(false);
    const [filters, setFilters] = useState({ nombre: '' });

    const proveedores = [
        { nombre: 'Sofá 350 cm de largo - 500 cm de ancho', nit: '123456789', email: 'proveedor1@example.com', telefono: '123-456-7890' },
        { nombre: 'Samsung Galaxy A100', nit: '987654321', email: 'proveedor2@example.com', telefono: '098-765-4321' },
        { nombre: 'Sofá 350 cm de largo - 500 cm de ancho', nit: '123456789', email: 'proveedor1@example.com', telefono: '123-456-7890' },
        { nombre: 'Samsung Galaxy A100', nit: '987654321', email: 'proveedor2@example.com', telefono: '098-765-4321' },
        { nombre: 'Sofá 350 cm de largo - 500 cm de ancho', nit: '123456789', email: 'proveedor1@example.com', telefono: '123-456-7890' },
    ];

    const filteredProveedores = proveedores.filter(proveedor => 
        proveedor.nombre.toLowerCase().includes(filters.nombre.toLowerCase())
    );

    const handleNewProviderClick = () => {
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
        // Aquí puedes manejar la lógica para crear un nuevo proveedor
        console.log("Proveedor creado");
    };

    return (
        <div className="proveedores-container">
            {showForm ? (
                <div className="create-provider-form">
                    <h2>Create Proveedores</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <br />
                                <label>Nombre*</label>
                                <input type="text" required />
                            </div>
                            <div className="form-group">
                                <br />
                                <label>NIT*</label>
                                <input type="text" required />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Email*</label>
                                <input type="email" required />
                            </div>
                            <div className="form-group">
                                <label>Teléfono*</label>
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
                        <h2>Proveedores</h2>
                        <button className="new-provider-button" onClick={handleNewProviderClick}>New proveedores</button>
                    </div>
                    <div className="filters">
                        <input
                            type="text"
                            name="nombre"
                            placeholder="Filtrar por nombre"
                            value={filters.nombre}
                            onChange={handleFilterChange}
                        />
                    </div>
                    <table className="proveedores-table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>NIT</th>
                                <th>Email</th>
                                <th>Teléfono</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProveedores.map((proveedor, index) => (
                                <tr key={index}>
                                    <td>{proveedor.nombre}</td>
                                    <td>{proveedor.nit}</td>
                                    <td>{proveedor.email}</td>
                                    <td>{proveedor.telefono}</td>
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

export default Proveedores;