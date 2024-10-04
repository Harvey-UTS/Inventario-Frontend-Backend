import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/clientes.css';

const Clientes = () => {
    const [showForm, setShowForm] = useState(false);
    const [filters, setFilters] = useState({ nombre: '' });
    const [selectedCliente, setSelectedCliente] = useState(null);
    const [clientes, setClientes] = useState([]); // Asegúrate de que comienza como un array
    const [formData, setFormData] = useState({
        nombre: '',
        nit: '',
        email: '',
        telefono: ''
    });

    useEffect(() => {
        fetchClientes();
    }, []);

    const fetchClientes = async () => {
        try {
            const response = await axios.get('/api/clientes');
            console.log('Clientes data:', response.data); // Verifica la respuesta aquí
            setClientes(response.data); // Asegúrate de que esto sea un array
        } catch (error) {
            console.error("Error fetching clientes:", error);
        }
    };

    const filteredClientes = Array.isArray(clientes) ? clientes.filter(cliente =>
        cliente.nombre.toLowerCase().includes(filters.nombre.toLowerCase())
    ) : [];

    const handleNewClientClick = () => {
        setFormData({ nombre: '', nit: '', email: '', telefono: '' });
        setSelectedCliente(null);
        setShowForm(true);
    };

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (selectedCliente) {
            // Actualiza el cliente existente
            axios.put(`/api/clientes/${selectedCliente.id}`, formData)
                .then(response => {
                    console.log('Cliente actualizado', response.data);
                    setShowForm(false);
                    fetchClientes(); // Actualiza la lista después de editar
                })
                .catch(error => {
                    console.error('Error actualizando el cliente', error);
                });
        } else {
            // Crea un nuevo cliente
            axios.post('/api/clientes', formData)
                .then(response => {
                    console.log('Cliente creado', response.data);
                    setShowForm(false);
                    fetchClientes(); // Actualiza la lista después de crear
                })
                .catch(error => {
                    console.error('Error creando el cliente', error);
                });
        }
    };

    const handleEditClick = (cliente) => {
        setSelectedCliente(cliente);
        setFormData({
            nombre: cliente.nombre,
            cedula: cliente.cedula,
            email: cliente.email,
            telefono: cliente.telefono
        });
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/clientes/${id}`);
            setClientes(clientes.filter(cliente => cliente.id !== id));
        } catch (error) {
            console.error("Error deleting cliente:", error);
        }
    };

    return (
        <div className="clientes-container">
            {showForm ? (
                <div className="create-client-form">
                    <h2>{selectedCliente ? 'Edit Cliente' : 'Create Cliente'}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <br />
                                <label>Nombre*</label>
                                <input
                                    type="text"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <br />
                                <label>Cedula*</label>
                                <input
                                    type="text"
                                    name="cedula"
                                    value={formData.cedula}
                                    onChange={handleInputChange}
                                    required
                                    disabled={selectedCliente}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Email*</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Teléfono*</label>
                                <input
                                    type="text"
                                    name="telefono"
                                    value={formData.telefono}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-buttons">
                            <button type="submit" className="create-button">
                                {selectedCliente ? 'Update' : 'Create'}
                            </button>
                            <button
                                type="button"
                                className="cancel-button"
                                onClick={() => setShowForm(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <>
                    <div className="header">
                        <h2>Clientes</h2>
                        <button className="new-cliente-button" onClick={handleNewClientClick}>
                            New Cliente
                        </button>
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
                    <table className="clientes-table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>cedula</th>
                                <th>Email</th>
                                <th>Teléfono</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredClientes.map((cliente, index) => (
                                <tr key={index}>
                                    <td>{cliente.nombre}</td>
                                    <td>{cliente.cedula}</td>
                                    <td>{cliente.email}</td>
                                    <td>{cliente.telefono}</td>
                                    <td>
                                        <button className="edit-button" onClick={() => handleEditClick(cliente)}>Edit</button>
                                        <button className="edit-button" onClick={() => handleDelete(cliente.id)}>Delete</button>
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
