import React, { useState, useEffect } from 'react';
import '../../../css/gestor_almacen.css';
import Gestor_Activo from './gestor_activo.jsx';
import Gestor_Inactivo from './gestor_inactivo.jsx';
import axios from 'axios';

const Gestor_Almacen = () => {
    const [gestores, setGestores] = useState([]);
    const [selectedSection, setSelectedSection] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentGestor, setCurrentGestor] = useState(null);
    const [filtro, setFiltro] = useState('');

    useEffect(() => {
        fetchGestores();
    }, []);

    const fetchGestores = async () => {
        try {
            const response = await axios.get('api/gestor-compras'); // Reemplaza con tu URL de API
            setGestores(response.data);
        } catch (error) {
            console.error('Error fetching gestores:', error);
        }
    };

    const handleSwitchChange = async (gestor) => {
        const updatedGestor = { ...gestor, estado: gestor.estado === 'Activo' ? 'Inactivo' : 'Activo' };
        try {
            await axios.put(`api/gestor-compras/${gestor.email}`, updatedGestor);
            fetchGestores(); // Actualiza la lista después de cambiar el estado
        } catch (error) {
            console.error('Error updating gestor:', error);
        }
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const nuevoGestor = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'), // Ahora solo envía estos 3 campos
        };

        try {
            if (isEditing) {
                await axios.put(`api/gestor-compras/${currentGestor.email}`, nuevoGestor);
            } else {
                await axios.post('api/gestor-compras', nuevoGestor);
            }

            fetchGestores(); // Refresca la lista de gestores
            setShowForm(false);
        } catch (error) {
            console.error('Error saving gestor:', error);
        }
    };

    const handleDeleteGestor = async (email) => {
        try {
            await axios.delete(`api/gestor-compras/${email}`);
            fetchGestores(); // Refresca la lista después de eliminar
        } catch (error) {
            console.error('Error deleting gestor:', error);
        }
    };

    const gestoresFiltrados = gestores
        .filter(gestor => gestor.rol === 'gestorCompra') // Filtra solo los que tienen rol 'gestorCompra'
        .filter(gestor => {
            const nombreGestor = gestor.nombre || ''; // Asegúrate de que sea una cadena
            return nombreGestor.toLowerCase().includes(filtro.toLowerCase());
        });

    return (
        <div>
            {selectedSection === null ? (
                <div className="button-group">
                    <div className="header">
                        <h2>Gestores Compras</h2>
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
                        <h2>Gestores Compras</h2>
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
                                                name="name" 
                                                required 
                                                defaultValue={isEditing ? currentGestor.name : ''} 
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
                                            <label>Contraseña*</label>
                                            <input 
                                                type="password" 
                                                name="password" 
                                                required 
                                                defaultValue={isEditing ? currentGestor.password : ''} 
                                            />
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
                                    <h2>Gestores Compras</h2>
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
                                        value={filtro}
                                        onChange={(e) => setFiltro(e.target.value)}
                                    />
                                </div>
                                <table className="gestores-table">
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Email</th>
                                            <th>Estado</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {gestoresFiltrados.map((gestor, index) => (
                                            <tr key={index}>
                                                <td>{gestor.name}</td>
                                                <td>{gestor.email}</td>
                                                <td>{gestor.estado}</td>
                                                <td>
                                                    <button className="edit-button" onClick={() => handleEditGestorClick(gestor)}>Editar</button>
                                                    <button className="edit-button" onClick={() => handleDeleteGestor(gestor.email)}>Eliminar</button>
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
                        <Gestor_Activo gestores={gestores.filter(g => g.estado === 'Activo' && g.rol === 'gestorCompra')} handleSwitchChange={handleSwitchChange} />
                    )}
                    {selectedSection === 'gestoresInactivos' && (
                        <Gestor_Inactivo gestores={gestores.filter(g => g.estado === 'Inactivo' && g.rol === 'gestorCompra')} handleSwitchChange={handleSwitchChange} />
                    )}
                </div>
            )}
        </div>
    );
};

export default Gestor_Almacen;
