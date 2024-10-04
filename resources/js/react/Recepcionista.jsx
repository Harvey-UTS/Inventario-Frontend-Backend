import ReactDOM from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import '../../css/Recepcionista.css';
import Proveedores from '../components/proveedores.jsx';
import Compras from '../components/compras.jsx';
import Productos from '../components/productos.jsx';
import Ventas from '../components/ventas.jsx';
import Clientes from '../components/clientes.jsx';
import Gestor_Almacen from '../components/gestor_almacen/gestor_almacen.jsx';
import Gestor_Compras from '../components/gestor_compras/gestor_compras.jsx';
import Gestor_Ventas from '../components/gestor_ventas/gestor_ventas.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUserCircle, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Recepcionista = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [dashboardMenuVisible, setDashboardMenuVisible] = useState(false);
  const [activeContent, setActiveContent] = useState(null);
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    // Obtener el rol del usuario después de iniciar sesión
    const fetchUserRole = async () => {
      try {
        const response = await axios.get('/user/role'); // Ajusta la ruta según tu configuración
        setRole(response.data.role);
      } catch (error) {
        console.error('Error al obtener el rol del usuario:', error);
      }
    };

    fetchUserRole();
  }, []);

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
    if (notificationsVisible) setNotificationsVisible(false);
  };

  const toggleNotifications = () => {
    setNotificationsVisible(!notificationsVisible);
    if (menuVisible) setMenuVisible(false);
  };

  const toggleDashboardMenu = () => {
    setDashboardMenuVisible(!dashboardMenuVisible);
  };

  const showProfile = () => setActiveContent('profile');

  const handleLogout = async () => {
    try {
      await axios.post('/logout');
      window.location.href = '/login';
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const renderSidebarItems = () => {
    switch (role) {
      case 'AdministradorAlmacen':
        return (
          <ul>
                <strong>
                    <li onClick={() => setActiveContent('Productos')}>Productos</li>
                    <li onClick={() => setActiveContent('Gestor_Almacen')}>Gestor de Almacen</li>
                </strong>
          </ul>
        );
      case 'gestorAlmacen':
        return (
            <ul>
                <strong>
                    <li onClick={() => setActiveContent('Productos')}>Productos</li>
                </strong>
            </ul>
        );
      case 'AdministradorCompras':
        return (
          <ul>
            <strong>
                <li onClick={() => setActiveContent('Gestor_Compras')}>Gestor de Compras</li>
                <li onClick={() => setActiveContent('Proveedores')}>Proveedores</li>
                <li onClick={() => setActiveContent('Compras')}>Compras</li>
            </strong>
          </ul>
        );
        case 'gestorCompras':
            return (
              <ul>
                    <strong>
                        <li onClick={() => setActiveContent('Proveedores')}>Proveedores</li>
                        <li onClick={() => setActiveContent('Compras')}>Compras</li>
                    </strong>
              </ul>
            );
      case 'AdministradorVentas':
        return (
          <ul>
                <strong>
                    <li onClick={() => setActiveContent('Gestor_Ventas')}>Gestor de Ventas</li>
                    <li onClick={() => setActiveContent('Clientes')}>Clientes</li>
                    <li onClick={() => setActiveContent('Ventas')}>Ventas</li>
                </strong>
          </ul>
        );
      case 'gestorVentas':
            return (
                <ul>
                    <strong>
                        <li onClick={() => setActiveContent('Clientes')}>Clientes</li>
                        <li onClick={() => setActiveContent('Ventas')}>Ventas</li>
                    </strong>
                </ul>
            );
      default:
        return <ul><li>No tienes permisos para ver esta página</li></ul>;
    }
  };

  return (
    <div className="dashboard-container">
      <header className="header">
        <div className="menu-icons">
          <FontAwesomeIcon icon={faBell} className="icon notification-icon" onClick={toggleNotifications} />
          <span className="notification-badge">3</span>
          <FontAwesomeIcon icon={faUserCircle} className="icon login-icon" onClick={toggleMenu} />
        </div>
        {menuVisible && (
          <div className="user-menu">
            <ul>
            <li>Rol actual: {role}</li>
            <li onClick={handleLogout}>Logout</li>
            </ul>
          </div>
        )}
        {notificationsVisible && (
          <div className="notifications-dropdown">
            <ul>
              <li>Prueba 1</li>
              <li>Prueba 2</li>
              <li>Prueba 3</li>
            </ul>
          </div>
        )}
      </header>

      <nav className={`sidebar ${sidebarActive ? 'active' : ''}`}>
        <center><h2 className="brand">Menu</h2></center><br />
        {renderSidebarItems()}
      </nav>

      <div className="main-content">
        {activeContent === 'Proveedores' && (
          <Proveedores/>
        )}
        {activeContent === 'Compras' && (
          <Compras/>
        )}
        {activeContent === 'Productos' && (
          <Productos/>
        )}
        {activeContent === 'Ventas' && (
          <Ventas/>
        )}
        {activeContent === 'Clientes' && (
          <Clientes/>
        )}
        {activeContent === 'Gestor_Almacen' && (
          <Gestor_Almacen/>
        )}
        {activeContent === 'Gestor_Compras' && (
          <Gestor_Compras/>
        )}
        {activeContent === 'Gestor_Ventas' && (
          <Gestor_Ventas/>
        )}
      </div>
    </div>
  );
};

export default Recepcionista;

if (document.getElementById('root')) {
  const Index = ReactDOM.createRoot(document.getElementById("root"));
  Index.render(
    <React.StrictMode>
      <Recepcionista />
    </React.StrictMode>
  );
}
