import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/compras.css'; // Asegúrate de tener un archivo CSS correcto

const Compras = () => {
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editCompraId, setEditCompraId] = useState(null);
    const [filters, setFilters] = useState({ idProducto: '', idProveedor: '' });
    const [productos, setProductos] = useState([]);
    const [proveedores, setProveedores] = useState([]);
    const [compras, setCompras] = useState([]);
    const [formData, setFormData] = useState({
        idProductos: '',
        idProveedores: '',
        cantidad: '',
        valor_unitario: '',
        soporte_de_compra: '',
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const productosResponse = await axios.get('/api/productos'); // Ajusta la URL según tu API
            const proveedoresResponse = await axios.get('/api/proveedores'); // Ajusta la URL según tu API
            const comprasResponse = await axios.get('/api/compras'); // Ajusta la URL según tu API
            setProductos(productosResponse.data);
            setProveedores(proveedoresResponse.data);
            setCompras(comprasResponse.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleNewCompraClick = () => {
        setShowForm(true);
        setIsEditing(false);
        setFormData({
            idProductos: '',
            idProveedores: '',
            cantidad: '',
            valor_unitario: '',
            soporte_de_compra: '',
        });
    };

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
    };

    const handleEditClick = (compra) => {
        setShowForm(true);
        setIsEditing(true);
        setEditCompraId(compra.id);
        setFormData({
            idProductos: compra.idProductos,
            idProveedores: compra.idProveedores,
            cantidad: compra.cantidad,
            valor_unitario: compra.valor_unitario,
            soporte_de_compra: compra.soporte_de_compra,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                // Lógica para editar una compra
                await axios.put(`/api/compras/${editCompraId}`, formData); // Ajusta la URL según tu API
            } else {
                // Lógica para crear una nueva compra
                await axios.post('/api/compras', formData); // Ajusta la URL según tu API
            }
            fetchData(); // Vuelve a cargar los datos
            setShowForm(false); // Cierra el formulario
        } catch (error) {
            console.error(isEditing ? 'Error updating compra:' : 'Error creating compra:', error);
        }
    };

    const handleDeleteClick = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta compra?')) {
            try {
                await axios.delete(`/api/compras/${id}`); // Ajusta la URL según tu API
                fetchData(); // Vuelve a cargar los datos
            } catch (error) {
                console.error('Error deleting compra:', error);
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className="compras-container">
            {showForm ? (
                <div className="create-compra-form">
                    <h2>{isEditing ? 'Edit Compra' : 'Create Compra'}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <br />
                                <label>Producto*</label>
                                <select name="idProductos" value={formData.idProductos} onChange={handleInputChange} required>
                                    <option value="">Select an option</option>
                                    {productos.map(producto => (
                                        <option key={producto.id} value={producto.id}>{producto.nombre}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <br />
                                <label>Proveedor*</label>
                                <select name="idProveedores" value={formData.idProveedores} onChange={handleInputChange} required>
                                    <option value="">Select an option</option>
                                    {proveedores.map(proveedor => (
                                        <option key={proveedor.id} value={proveedor.id}>{proveedor.nombre}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Cantidad*</label>
                                <input type="number" name="cantidad" value={formData.cantidad} onChange={handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label>Valor Unitario*</label>
                                <input type="number" name="valor_unitario" value={formData.valor_unitario} onChange={handleInputChange} required />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Soporte Compra*</label>
                                <input type="text" name="soporte_de_compra" value={formData.soporte_de_compra} onChange={handleInputChange} required />
                            </div>
                        </div>
                        <div className="form-buttons">
                            <button type="submit" className="create-button">{isEditing ? 'Update' : 'Create'}</button>
                            <button type="button" className="cancel-button" onClick={() => setShowForm(false)}>Cancel</button>
                        </div>
                    </form>
                </div>
            ) : (
                <>
                    <div className="header">
                        <h2>Compras</h2>
                        <button className="new-compra-button" onClick={handleNewCompraClick}>New Compra</button>
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
                            name="idProveedor"
                            placeholder="Filtrar por ID Proveedor"
                            value={filters.idProveedor}
                            onChange={handleFilterChange}
                        />
                    </div>
                    <table className="compras-table">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Proveedor</th>
                                <th>Cantidad</th>
                                <th>Valor Unitario</th>
                                <th>Precio Compra</th>
                                <th>Soporte Compra</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {compras.filter(compra =>
                                (filters.idProducto === '' || compra.products.id.toString().includes(filters.idProducto)) &&
                                (filters.idProveedor === '' || compra.proveedores.id.toString().includes(filters.idProveedor))
                            ).map((compra, index) => (
                                <tr key={index}>
                                    <td>{compra.products.nombre}</td>
                                    <td>{compra.proveedores.nombre}</td>
                                    <td>{compra.cantidad}</td>
                                    <td>{compra.valor_unitario.toLocaleString()}</td>
                                    <td>{compra.precio_de_compra.toLocaleString()}</td>
                                    <td>{compra.soporte_de_compra}</td>
                                    <td>
                                        <button className="edit-button" onClick={() => handleEditClick(compra)}>Edit</button>
                                        <button className="edit-button" onClick={() => handleDeleteClick(compra.id)}>Delete</button>
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

export default Compras;