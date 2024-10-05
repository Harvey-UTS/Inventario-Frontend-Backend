import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../css/gestor_almacen.css';
import '../../../css/gestorai.css';

const GestorCompras = () => {
    const [nuevoGestor, setNuevoGestor] = useState({
        name: '',
        email: '',
        password: '',
        estado: 'activo',
    });
    const [usuarios, setUsuarios] = useState([]);
    const [filters, setFilters] = useState({ nombre: '' });
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentGestor, setCurrentGestor] = useState(null);
    const [viewMode, setViewMode] = useState('verGestores');

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await axios.get('/api/gestores');
                setUsuarios(response.data);
            } catch (error) {
                console.error('Error al obtener los usuarios:', error.response?.data || error.message);
            }
        };

        fetchUsuarios();
    }, []);

    const createGestor = async () => {
        try {
            const response = await axios.post('/api/gestores', nuevoGestor);
            setUsuarios((prev) => [...prev, response.data]);
            resetForm();
        } catch (error) {
            console.error('Error al crear el gestor:', error.response?.data || error.message);
        }
    };

    const updateGestor = async () => {
        try {
            const response = await axios.put(`/api/gestores/${currentGestor.id}`, nuevoGestor);
            setUsuarios((prev) => prev.map((gestor) => (gestor.id === currentGestor.id ? response.data : gestor)));
            resetForm();
        } catch (error) {
            console.error('Error al actualizar el gestor:', error.response?.data || error.message);
        }
    };

    const deleteGestor = async (gestorId) => {
        try {
            await axios.delete(`/api/gestores/${gestorId}`);
            setUsuarios((prev) => prev.filter((gestor) => gestor.id !== gestorId));
        } catch (error) {
            console.error('Error al eliminar el gestor:', error.response?.data || error.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            updateGestor();
        } else {
            createGestor();
        }
        setShowModal(false);
    };

    const handleEditGestorClick = (gestor) => {
        setIsEditing(true);
        setCurrentGestor(gestor);
        setNuevoGestor({ name: gestor.name, email: gestor.email, password: '', estado: gestor.estado });
        setShowModal(true);
    };

    const resetForm = () => {
        setNuevoGestor({ name: '', email: '', password: '', estado: 'activo' });
        setIsEditing(false);
        setCurrentGestor(null);
        setShowModal(false);
    };

    const filteredUsuarios = usuarios.filter((usuario) =>
        usuario.name.toLowerCase().includes(filters.nombre.toLowerCase())
    );

    // Filtrar gestores activos e inactivos
    const activos = usuarios.filter(gestor => gestor.estado === 'activo');
    const inactivos = usuarios.filter(gestor => gestor.estado === 'inactivo');

    // Cambiar estado del gestor
    const handleToggleState = (gestor) => {
        const confirmChange = window.confirm("¿Estás seguro que deseas cambiar el estado de este gestor?");
        if (confirmChange) {
            // Cambiar el estado entre 'Activo' e 'Inactivo'
            const updatedGestor = { ...gestor, estado: gestor.estado === 'activo' ? 'inactivo' : 'activo' };
            
            // Actualizar en la API
            updateGestorInApi(updatedGestor); // Llamar a la función que actualiza el estado en la API
        }
    };

    // Función para actualizar el gestor en la API
    const updateGestorInApi = async (updatedGestor) => {
        try {
            await axios.put(`/api/gestores/${updatedGestor.id}`, updatedGestor); // Enviar el gestor actualizado a la API
            setUsuarios((prev) => prev.map((gestor) => (gestor.id === updatedGestor.id ? updatedGestor : gestor))); // Actualizar el estado en el frontend
        } catch (error) {
            console.error('Error al actualizar el estado del gestor:', error.response?.data || error.message);
        }
    };

    return (
        <div className="SUBELO">
            <div className="header">
                <h2>Gestores Compras</h2>
                <button className="new-gestor-button" onClick={() => { resetForm(); setShowModal(true); }}>
                    {showModal ? 'Cancelar' : 'Nuevo Gestor'}
                </button>
            </div>

            <div className="filter-and-buttons">
                <div className="button-group">
                    <button className="view-button" onClick={() => setViewMode('verGestores')}>Ver Gestores</button>
                    <button className="active-button" onClick={() => setViewMode('gestoresActivos')}>Gestores Activos</button>
                    <button className="inactive-button" onClick={() => setViewMode('gestoresInactivos')}>Gestores Inactivos</button>
                    <input
                        type="text"
                        placeholder="Filtrar por nombre"
                        value={filters.nombre}
                        onChange={(e) => setFilters({ ...filters, nombre: e.target.value })}
                        className="filter-input"
                    />
                </div>
            </div>

            {viewMode === 'verGestores' && (
                <table className="usuarios-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsuarios.map((usuario) => (
                            <tr key={usuario.id} className="usuario-row">
                                <td>{usuario.name}</td>
                                <td>{usuario.email}</td>
                                <td>{usuario.estado}</td>
                                <td>
                                    <button onClick={() => handleEditGestorClick(usuario)}>Editar</button>
                                    <button onClick={() => deleteGestor(usuario.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {viewMode === 'gestoresActivos' && (
                <div className="gestores-activos">
                    {activos.map(gestor => (
                        <div className="gestor-card" key={gestor.id}>
                            <h3>{gestor.name}</h3>
                            <label className="switch">
                                <input 
                                    type="checkbox" 
                                    checked={gestor.estado === 'activo'}  // Switch encendido
                                    onChange={() => handleToggleState(gestor)} 
                                />
                                <span className="slider"></span>
                            </label>
                        </div>
                    ))}
                </div>
            )}

            {viewMode === 'gestoresInactivos' && (
                <div className="gestores-inactivos">
                    {inactivos.map(gestor => (
                        <div className="gestor-card" key={gestor.id}>
                            <h3>{gestor.name}</h3>
                            <label className="switch">
                                <input 
                                    type="checkbox" 
                                    checked={gestor.estado === 'activo' ? true : false}  // Switch apagado
                                    onChange={() => handleToggleState(gestor)} 
                                />
                                <span className="slider"></span>
                            </label>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal para el formulario */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={resetForm}>&times;</span>
                        <form onSubmit={handleSubmit} className="gestor-form">
                            <div className="form-group">
                                <label htmlFor="name" className="form-label">Nombre</label>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Nombre"
                                    value={nuevoGestor.name}
                                    onChange={(e) => setNuevoGestor({ ...nuevoGestor, name: e.target.value })}
                                    required
                                    className="form-input"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" className="form-label">Correo</label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Correo"
                                    value={nuevoGestor.email}
                                    onChange={(e) => setNuevoGestor({ ...nuevoGestor, email: e.target.value })}
                                    required
                                    className="form-input"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="form-label">Contraseña</label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Contraseña"
                                    value={nuevoGestor.password}
                                    onChange={(e) => setNuevoGestor({ ...nuevoGestor, password: e.target.value })}
                                    required
                                    className="form-input"
                                />
                            </div>
                            <button type="submit" className="submit-button">
                                {isEditing ? 'Actualizar Gestor' : 'Crear Gestor'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GestorCompras;