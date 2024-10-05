import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/ventas.css'; // Asegúrate de tener un archivo CSS correcto

const Ventas = () => {
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editVentaId, setEditVentaId] = useState(null);
    const [filters, setFilters] = useState({ idProducto: '', idCliente: '' });
    const [productos, setProductos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [ventas, setVentas] = useState([]);
    const [formData, setFormData] = useState({
        idProductos: '',
        idClientes: '',
        cantidad: '',
        valor_unitario: '',
        soporte_de_compra: '',
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const productosResponse = await axios.get('/api/productos');
            const clientesResponse = await axios.get('/api/clientes');
            const ventasResponse = await axios.get('/api/ventas');
            setProductos(productosResponse.data);
            setClientes(clientesResponse.data);
            setVentas(ventasResponse.data);
            console.log(ventasResponse.data); // Para verificar la estructura de los datos
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleNewVentaClick = () => {
        setShowForm(true);
        setIsEditing(false);
        setFormData({
            idProductos: '',
            idClientes: '',
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

    const handleEditClick = (venta) => {
        setShowForm(true);
        setIsEditing(true);
        setEditVentaId(venta.id);
        setFormData({
            idProductos: venta.idProductos,
            idClientes: venta.idClientes,
            cantidad: venta.cantidad,
            valor_unitario: venta.valor_unitario,
            soporte_de_compra: venta.soporte_de_compra,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                // Lógica para editar una venta
                await axios.put(`/api/ventas/${editVentaId}`, formData); // Ajusta la URL según tu API
            } else {
                // Lógica para crear una nueva venta
                await axios.post('/api/ventas', formData); // Ajusta la URL según tu API
            }
            fetchData(); // Vuelve a cargar los datos
            setShowForm(false); // Cierra el formulario
        } catch (error) {
            console.error(isEditing ? 'Error updating venta:' : 'Error creating venta:', error);
        }
    };

    const handleDeleteClick = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta venta?')) {
            try {
                await axios.delete(`/api/ventas/${id}`); // Ajusta la URL según tu API
                fetchData(); // Vuelve a cargar los datos
            } catch (error) {
                console.error('Error deleting venta:', error);
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
        <div className="ventas-container">
            {showForm ? (
                <div className="create-venta-form">
                    <h2>{isEditing ? 'Edit Venta' : 'Create Venta'}</h2>
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
                                <label>Cliente*</label>
                                <select name="idClientes" value={formData.idClientes} onChange={handleInputChange} required>
                                    <option value="">Select an option</option>
                                    {clientes.map(cliente => (
                                        <option key={cliente.id} value={cliente.id}>{cliente.nombre}</option>
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
                                <label>Soporte Venta*</label>
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
                        <h2>Ventas</h2>
                        <button className="new-venta-button" onClick={handleNewVentaClick}>New Venta</button>
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
                            name="idCliente"
                            placeholder="Filtrar por ID Cliente"
                            value={filters.idCliente}
                            onChange={handleFilterChange}
                        />
                    </div>
                    <table className="ventas-table">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Cliente</th>
                                <th>Cantidad</th>
                                <th>Valor Unitario</th>
                                <th>Precio Venta</th>
                                <th>Soporte Venta</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ventas.filter(venta =>
                                (filters.idProducto === '' || (venta.producto && venta.producto.id.toString().includes(filters.idProducto))) &&
                                (filters.idCliente === '' || (venta.cliente && venta.cliente.id.toString().includes(filters.idCliente)))
                            ).map((venta, index) => (
                                <tr key={index}>
                                     <td>{venta.products.nombre}</td>
                                    <td>{venta.clientes.nombre}</td>
                                    <td>{venta.cantidad}</td>
                                    <td>{venta.valor_unitario.toLocaleString()}</td>
                                    <td>{venta.precio_de_venta.toLocaleString()}</td>
                                    <td>{venta.soporte_de_compra}</td>
                                    <td>
                                        <button className="edit-button" onClick={() => handleEditClick(venta)}>Edit</button>
                                        <button className="edit-button" onClick={() => handleDeleteClick(venta.id)}>Delete</button>
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

export default Ventas;
