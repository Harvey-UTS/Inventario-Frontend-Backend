import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/proveedores.css';

const Proveedores = () => {
    const [showForm, setShowForm] = useState(false);
    const [filters, setFilters] = useState({ nombre: '' });
    const [selectedProveedor, setSelectedProveedor] = useState(null);
    const [proveedores, setProveedores] = useState([]);
    const [formData, setFormData] = useState({
        nombre: '',
        nit: '',
        email: '',
        telefono: ''
    });
    const [newProveedor, setNewProveedor] = useState({
        nombre: '',
        nit: '',
        email: '',
        telefono: ''
    });

    useEffect(() => {
        fetchProveedores();
    }, []);

    const fetchProveedores = async () => {
        try {
            const response = await axios.get('/api/proveedores');
            setProveedores(response.data);
        } catch (error) {
            console.error("Error fetching proveedores:", error);
        }
    };

    const filteredProveedores = proveedores.filter(proveedor =>
        proveedor.nombre.toLowerCase().includes(filters.nombre.toLowerCase())
    );

    const handleNewProviderClick = () => {
        setFormData({ nombre: '', nit: '', email: '', telefono: '' }); // Limpiar el formulario
        setSelectedProveedor(null); // Indicar que no estamos editando un proveedor
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

        if (selectedProveedor) {
            // Si estamos editando un proveedor existente, enviar una solicitud PUT para actualizar
            axios.put(`/api/proveedores/${selectedProveedor.id}`, formData)
                .then(response => {
                    console.log('Proveedor actualizado', response.data);
                    setShowForm(false);
                })
                .catch(error => {
                    console.error('Error actualizando el proveedor', error);
                });
        } else {
            // Si es un nuevo proveedor, enviar una solicitud POST para crear
            axios.post('/api/proveedores', formData)
                .then(response => {
                    console.log('Proveedor creado', response.data);
                    setShowForm(false);
                })
                .catch(error => {
                    console.error('Error creando el proveedor', error);
                });
        }
    };

    const handleEditClick = (proveedor) => {
        setSelectedProveedor(proveedor); // Guardar el proveedor seleccionado completo
        setFormData({
            nombre: proveedor.nombre,
            nit: proveedor.nit,
            email: proveedor.email,
            telefono: proveedor.telefono
        }); // Cargar los datos del proveedor en el formulario
        setShowForm(true); // Mostrar el formulario
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/proveedores/${id}`);
            setProveedores(proveedores.filter(proveedor => proveedor.id !== id)); // Filtra el proveedor eliminado
        } catch (error) {
            console.error("Error deleting proveedor:", error);
        }
    };

    return (
        <div className="proveedores-container">
            {showForm ? (
                <div className="create-provider-form">
                    <h2>{selectedProveedor ? 'Edit Proveedor' : 'Create Proveedor'}</h2>
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
                                <label>NIT*</label>
                                <input
                                    type="text"
                                    name="nit"
                                    value={formData.nit}
                                    onChange={handleInputChange}
                                    required
                                    disabled={selectedProveedor} // Deshabilitar el NIT si estamos editando
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
                                {selectedProveedor ? 'Update' : 'Create'}
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
                        <h2>Proveedores</h2>
                        <button className="new-provider-button" onClick={handleNewProviderClick}>
                            New Proveedor
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
                                        <button className="edit-button" onClick={() => handleEditClick(proveedor)}>Edit</button>
                                        <button className="edit-button" onClick={() => handleDelete(proveedor.id)}>Delete</button>
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

