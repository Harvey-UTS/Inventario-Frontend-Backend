import React, { useState, useEffect } from 'react';
import '../../../css/gestor_almacen.css';
import Gestores_Activos from './gestor_activo.jsx';
import Gestores_Inactivos from './gestor_inactivo.jsx';

const Gestor_Ventas = () => {
    const [gestores, setGestores] = useState([]);
    const [selectedSection, setSelectedSection] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentGestor, setCurrentGestor] = useState(null);
    const [filters, setFilters] = useState({ nombre: '', apellido: '', email: '' });

    useEffect(() => {
        const storedGestores = JSON.parse(localStorage.getItem('gestor_ventas'));
        if (storedGestores) {
            setGestores(storedGestores);
        }
    }, []);

    const handleSwitchChange = (gestor) => {
        const updatedGestores = gestores.map(g => 
            g.email === gestor.email ? { ...g, estado: g.estado === 'Activo' ? 'Inactivo' : 'Activo' } : g
        );
        setGestores(updatedGestores);
        localStorage.setItem('gestor_ventas', JSON.stringify(updatedGestores));
    };

    const handleNewGestorClick = () => {
        setIsEditing(false);
        setCurrentGestor(null);
        setShowForm(true);
    };

    const handleEditGestorClick = (gestor) => {
        setIsEditing(true);
        setCurrentGestor(gestor);
        setShowForm(true);
    };

    const handleDeleteGestorClick = (gestorEmail) => {
        const updatedGestores = gestores.filter(g => g.email !== gestorEmail);
        setGestores(updatedGestores);
        localStorage.setItem('gestor_ventas', JSON.stringify(updatedGestores));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const nuevoGestor = {
            nombre: formData.get('nombre'),
            apellido: formData.get('apellido'),
            email: formData.get('email'),
            estado: formData.get('estado'),
        };

        let updatedGestores;
        if (isEditing) {
            updatedGestores = gestores.map(g => 
                g.email === currentGestor.email ? { ...nuevoGestor, email: currentGestor.email } : g // Asegúrate de mantener el email al editar
            );
        } else {
            updatedGestores = [...gestores, { ...nuevoGestor, id: Date.now() }];
        }

        setGestores(updatedGestores);
        localStorage.setItem('gestor_ventas', JSON.stringify(updatedGestores));
        setShowForm(false);
    };

    const filteredGestores = gestores.filter(gestor => 
        gestor.nombre.toLowerCase().includes(filters.nombre.toLowerCase())
    );

    return (
        <div>
            {selectedSection === null ? (
                <div className="button-group">
                    <div className="header">
                        <h2>Gestor de Ventas</h2>
                    </div>
                    <button className="button" onClick={() => setSelectedSection('verGestores')}>
                        Ver Gestores
                    </button>
                    <button className="button" onClick={() => setSelectedSection('gestoresActivos')}>
                        Gestores Activos
                    </button>
                    <button className="button" onClick={() => setSelectedSection('gestoresInactivos')}>
                        Gestores Inactivos
                    </button>
                </div>
            ) : (
                <div className="content-section">
                    <div className="header">
                        <h2>Gestor de Ventas</h2>
                        <div className="button-container">
                            <button className="new-gestor-button" onClick={() => setSelectedSection(null)}>Regresar</button>
                        </div>
                    </div>
                    {selectedSection === 'verGestores' && 
                    <div className="gestores-container">
                        {showForm ? (
                            <div className="create-gestor-form">
                                <h2>{isEditing ? 'Editar Gestor' : 'Crear Gestor'}</h2><br />
                                <form onSubmit={handleSubmit}>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Nombre*</label>
                                            <input 
                                                type="text" 
                                                name="nombre" 
                                                required 
                                                defaultValue={isEditing ? currentGestor.nombre : ''} 
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Apellido*</label>
                                            <input 
                                                type="text" 
                                                name="apellido" 
                                                required 
                                                defaultValue={isEditing ? currentGestor.apellido : ''} 
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Email*</label>
                                            <input 
                                                type="email" 
                                                name="email" 
                                                required 
                                                defaultValue={isEditing ? currentGestor.email : ''} 
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Estado*</label>
                                            <select name="estado" required defaultValue={isEditing ? currentGestor.estado : 'Activo'}>
                                                <option value="Activo">Activo</option>
                                                <option value="Inactivo">Inactivo</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-buttons">
                                        <button type="submit" className="create-button">{isEditing ? 'Actualizar' : 'Crear'}</button>
                                        <button type="button" className="cancel-button" onClick={() => setShowForm(false)}>Cancelar</button>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <>
                                <div className="header">
                                    <h2>Gestores</h2>
                                    <div className="button-container">
                                        <button className="new-gestor-button" onClick={() => setSelectedSection(null)}>Regresar</button>
                                        <button className="new-gestor-button" onClick={handleNewGestorClick}>Nuevo Gestor</button>
                                    </div>
                                </div>
                                <div className="filters">
                                    <input
                                        type="text"
                                        name="nombre"
                                        placeholder="Filtrar por nombre"
                                        value={filters.nombre}
                                        onChange={(e) => setFilters({ ...filters, nombre: e.target.value })}
                                    />
                                </div>
                                <table className="gestores-table">
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Apellido</th>
                                            <th>Email</th>
                                            <th>Estado</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredGestores.map((gestor, index) => (
                                            <tr key={index}>
                                                <td>{gestor.nombre}</td>
                                                <td>{gestor.apellido}</td>
                                                <td>{gestor.email}</td>
                                                <td>{gestor.estado}</td>
                                                <td>
                                                    <button className="edit-button" onClick={() => handleEditGestorClick(gestor)}>Editar</button>
                                                    <button className="edit-button" onClick={() => handleDeleteGestorClick(gestor.email)}>Eliminar</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </>
                        )}
                    </div>
                    }
                    {selectedSection === 'gestoresActivos' && (
                        <Gestores_Activos gestores={gestores.filter(g => g.estado === 'Activo')} handleSwitchChange={handleSwitchChange} />
                    )}
                    {selectedSection === 'gestoresInactivos' && (
                        <Gestores_Inactivos gestores={gestores.filter(g => g.estado === 'Inactivo')} handleSwitchChange={handleSwitchChange} />
                    )}
                </div>
            )}
        </div>
    );
};

export default Gestor_Ventas;