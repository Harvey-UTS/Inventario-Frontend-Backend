import React, { useState, useEffect } from 'react';
import '../../../css/gestor_almacen.css';
import Ventas_Activas from './gestor_activo.jsx';
import Ventas_Inactivas from './gestor_inactivo.jsx';

const Gestor_Ventas = () => {
    const [ventas, setVentas] = useState([]);
    const [selectedSection, setSelectedSection] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentVenta, setCurrentVenta] = useState(null);
    const [filters, setFilters] = useState({ nombre: '', apellido: '', email: '' });

    useEffect(() => {
        const storedVentas = JSON.parse(localStorage.getItem('gestor_ventas'));
        if (storedVentas) {
            setVentas(storedVentas);
        }
    }, []);

    const handleSwitchChange = (venta) => {
        const updatedVentas = ventas.map(v => 
            v.id === venta.id ? { ...v, estado: v.estado === 'Activo' ? 'Inactivo' : 'Activo' } : v
        );
        setVentas(updatedVentas);
        localStorage.setItem('gestor_ventas', JSON.stringify(updatedVentas));
    };

    const handleNewVentaClick = () => {
        setIsEditing(false);
        setCurrentVenta(null);
        setShowForm(true);
    };

    const handleEditVentaClick = (venta) => {
        setIsEditing(true);
        setCurrentVenta(venta);
        setShowForm(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const nuevaVenta = {
            nombre: formData.get('nombre'),
            apellido: formData.get('apellido'),
            email: formData.get('email'),
            estado: formData.get('estado'),
        };

        let updatedVentas;
        if (isEditing) {
            updatedVentas = ventas.map(v => 
                v.id === currentVenta.id ? { ...nuevaVenta, id: currentVenta.id } : v // Asegúrate de mantener el ID al editar
            );
        } else {
            updatedVentas = [...ventas, { ...nuevaVenta, id: Date.now() }];
        }

        setVentas(updatedVentas);
        localStorage.setItem('gestor_ventas', JSON.stringify(updatedVentas));
        setShowForm(false);
    };

    const filteredVentas = ventas.filter(venta => 
        venta.nombre.toLowerCase().includes(filters.nombre.toLowerCase())
    );

    return (
        <div>
            {selectedSection === null ? (
                <div className="button-group">
                    <div className="header">
                    <h2>Gestor de Ventas</h2>
                    </div>
                    <button className="button" onClick={() => setSelectedSection('verVentas')}>
                        Ver Ventas
                    </button>
                    <button className="button" onClick={() => setSelectedSection('ventasActivas')}>
                        Ventas Activas
                    </button>
                    <button className="button" onClick={() => setSelectedSection('ventasInactivas')}>
                        Ventas Inactivas
                    </button>
                </div>
            ) : (
                <div className="content-section">
                    <div className="header">
                        <h2>Gestor de Ventas</h2>
                    </div>
                    {selectedSection === 'verVentas' && 
                    <div className="ventas-container">
                        {showForm ? (
                            <div className="create-venta-form">
                                <h2>{isEditing ? 'Editar Venta' : 'Crear Venta'}</h2><br />
                                <form onSubmit={handleSubmit}>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Nombre*</label>
                                            <input 
                                                type="text" 
                                                name="nombre" 
                                                required 
                                                defaultValue={isEditing ? currentVenta.nombre : ''} 
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Apellido*</label>
                                            <input 
                                                type="text" 
                                                name="apellido" 
                                                required 
                                                defaultValue={isEditing ? currentVenta.apellido : ''} 
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
                                                defaultValue={isEditing ? currentVenta.email : ''} 
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Estado*</label>
                                            <select name="estado" required defaultValue={isEditing ? currentVenta.estado : 'Activo'}>
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
                                    <h2>Ventas</h2>
                                    <button className="new-venta-button" onClick={handleNewVentaClick}>Nueva Venta</button>
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
                                <table className="ventas-table">
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
                                        {filteredVentas.map((venta, index) => (
                                            <tr key={index}>
                                                <td>{venta.nombre}</td>
                                                <td>{venta.apellido}</td>
                                                <td>{venta.email}</td>
                                                <td>{venta.estado}</td>
                                                <td>
                                                    <button className="edit-button" onClick={() => handleEditVentaClick(venta)}>Editar</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </>
                        )}
                    </div>
                    }
                    {selectedSection === 'ventasActivas' && (
                        <Ventas_Activas ventas={ventas.filter(v => v.estado === 'Activo')} handleSwitchChange={handleSwitchChange} />
                    )}
                    {selectedSection === 'ventasInactivas' && (
                        <Ventas_Inactivas ventas={ventas.filter(v => v.estado === 'Inactivo')} handleSwitchChange={handleSwitchChange} />
                    )}
                </div>
            )}
        </div>
    );
};

export default Gestor_Ventas;