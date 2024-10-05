import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../css/gestor_almacen.css';

const GestorCompras = () => {
    const [nuevoGestor, setNuevoGestor] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [usuarios, setUsuarios] = useState([]);
    const [filters, setFilters] = useState({ nombre: '' });
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentGestor, setCurrentGestor] = useState(null);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await axios.get('/api/gestores'); // Asegúrate de que esta ruta sea correcta
                console.log(response.data);
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
            console.log('Gestor creado:', response.data);
            setUsuarios((prev) => [...prev, response.data]);
            resetForm();
        } catch (error) {
            console.error('Error al crear el gestor:', error.response?.data || error.message);
        }
    };

    const updateGestor = async () => {
        try {
            const response = await axios.put(`/api/gestores/${currentGestor.id}`, nuevoGestor);
            console.log('Gestor actualizado:', response.data);
            setUsuarios((prev) => prev.map((gestor) => (gestor.id === currentGestor.id ? response.data : gestor))); // Actualiza la lista
            resetForm();
        } catch (error) {
            console.error('Error al actualizar el gestor:', error.response?.data || error.message);
        }
    };

    const deleteGestor = async (gestorId) => {
        try {
            await axios.delete(`/api/gestores/${gestorId}`); // Cambiar a usar el ID
            setUsuarios((prev) => prev.filter((gestor) => gestor.id !== gestorId)); // Elimina el gestor de la lista
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
        setShowForm(false); // Cierra el formulario después de enviar
    };

    const handleEditGestorClick = (gestor) => {
        setIsEditing(true);
        setCurrentGestor(gestor);
        setNuevoGestor({ name: gestor.name, email: gestor.email, password: '' }); // Carga los datos en el formulario
        setShowForm(true);
    };

    const resetForm = () => {
        setNuevoGestor({ name: '', email: '', password: '' });
        setIsEditing(false);
        setCurrentGestor(null);
        setShowForm(false); // Cierra el formulario
    };

    const filteredUsuarios = usuarios.filter((usuario) =>
        usuario.name.toLowerCase().includes(filters.nombre.toLowerCase())
    );

    return (
        <div>
            <div className="header">
                <h2>Gestores Compras</h2>
                <button className="new-gestor-button" onClick={() => { resetForm(); setShowForm(true); }}>
                    {showForm ? 'Cancelar' : 'Nuevo Gestor'}
                </button>
            </div>
            {showForm && (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Nombre"
                        value={nuevoGestor.name}
                        onChange={(e) => setNuevoGestor({ ...nuevoGestor, name: e.target.value })}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Correo"
                        value={nuevoGestor.email}
                        onChange={(e) => setNuevoGestor({ ...nuevoGestor, email: e.target.value })}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={nuevoGestor.password}
                        onChange={(e) => setNuevoGestor({ ...nuevoGestor, password: e.target.value })}
                        required
                    />
                    <button type="submit">{isEditing ? 'Actualizar' : 'Crear'}</button>
                </form>
            )}
            <input
                type="text"
                placeholder="Filtrar por nombre"
                value={filters.nombre}
                onChange={(e) => setFilters({ ...filters, nombre: e.target.value })}
            />
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsuarios.map((usuario) => (
                        <tr key={usuario.id}> {/* Asegúrate de usar el ID correcto aquí */}
                            <td>{usuario.name}</td>
                            <td>{usuario.email}</td>
                            <td>
                                <button onClick={() => handleEditGestorClick(usuario)}>Editar</button>
                                <button onClick={() => deleteGestor(usuario.id)}>Eliminar</button> {/* Cambiar a usar el ID */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GestorCompras;