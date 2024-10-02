import React, { useState } from 'react';
import '../../css/clientes.css'; // Asegúrate de tener un archivo CSS correcto

const Clientes = () => {
    const [showForm, setShowForm] = useState(false);
    const [filters, setFilters] = useState({ nombre: '', cedula: '' });

    const [clientes, setClientes] = useState([
        {
            nombre: 'Juan Pérez',
            cedula: '12345678',
            email: 'juan.perez@example.com',
            telefono: '3001234567',
        },
        {
            nombre: 'María Gómez',
            cedula: '23456789',
            email: 'maria.gomez@example.com',
            telefono: '3012345678',
        },
        {
            nombre: 'Carlos López',
            cedula: '34567890',
            email: 'carlos.lopez@example.com',
            telefono: '3023456789',
        },
        {
            nombre: 'Ana Torres',
            cedula: '45678901',
            email: 'ana.torres@example.com',
            telefono: '3034567890',
        },
        {
            nombre: 'Luis Fernández',
            cedula: '56789012',
            email: 'luis.fernandez@example.com',
            telefono: '3045678901',
        },
    ]); // Estado para almacenar los clientes con 5 registros iniciales

    const handleNewClienteClick = () => {
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
        // Aquí puedes manejar la lógica para crear un nuevo cliente
        console.log("Cliente creado");
        // Resetea el formulario
        setShowForm(false);
    };

    return (
        <div className="clientes-container">
            {showForm ? (
                <div className="create-cliente-form">
                    <h2>Create Cliente</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <br />
                                <label>Nombre*</label>
                                <input type="text" required />
                            </div>
                            <div className="form-group">
                                <br />
                                <label>Cédula*</label>
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
                                <input type="tel" required />
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
                        <h2>Clientes</h2>
                        <button className="new-cliente-button" onClick={handleNewClienteClick}>New Cliente</button>
                    </div>
                    <div className="filters">
                        <input
                            type="text"
                            name="nombre"
                            placeholder="Filtrar por Nombre"
                            value={filters.nombre}
                            onChange={handleFilterChange}
                        />
                        <input
                            type="text"
                            name="cedula"
                            placeholder="Filtrar por Cédula"
                            value={filters.cedula}
                            onChange={handleFilterChange}
                        />
                    </div>
                    <table className="clientes-table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Cédula</th>
                                <th>Email</th>
                                <th>Teléfono</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientes.filter(cliente => 
                                cliente.nombre.toLowerCase().includes(filters.nombre.toLowerCase()) &&
                                cliente.cedula.toLowerCase().includes(filters.cedula.toLowerCase())
                            ).map((cliente, index) => (
                                <tr key={index}>
                                    <td>{cliente.nombre}</td>
                                    <td>{cliente.cedula}</td>
                                    <td>{cliente.email}</td>
                                    <td>{cliente.telefono}</td>
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

export default Clientes;