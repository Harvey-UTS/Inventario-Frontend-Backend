import ReactDOM from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import '../../css/login.css';
import { handleResize, iniciarSesion, register } from '../javascript/login.js';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        usuario: '',
        password: '',
        password_confirmation: '',
    });
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/register', formData, {
              headers: {
                'X-CSRF-TOKEN': csrfToken,
              },
            });
            if (response.status === 201) {
              // Mostrar alerta de confirmación
            window.alert('Usuario registrado con éxito');

            // Redirigir a la página principal
            window.location.href = '/';
            }
          } catch (error) {
            console.error('Error al conectar con el servidor:', error.response?.data);
          }
      };

      const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/login', formData, {
                headers: {
                    'X-CSRF-TOKEN': csrfToken, // Incluir el token CSRF en la cabecera
                },
            });
    
            // Redirigir según el rol del usuario
            if (response.status === 200) {
                const redirectUrl = response.data.redirect;
                window.location.href = redirectUrl; // Redirige a la interfaz correspondiente
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    // Credenciales incorrectas (correo o contraseña)
                    if (error.response.data.message === 'Credenciales incorrectas') {
                        alert('Lo siento, el correo o la contraseña son incorrectos. Por favor, verifica tus datos e inténtalo nuevamente.');
                    }
                } else if (error.response.status === 403) {
                    // Usuario inactivo
                    if (error.response.data.message === 'Su cuenta no está activa.') {
                        alert('Tu cuenta está inactiva. Por favor, contacta con soporte para más información.');
                    }
                } else {
                    // Error inesperado
                    alert('Ha ocurrido un error inesperado. Por favor, intenta de nuevo más tarde.');
                }
            } else {
                console.error('Error al conectar con el servidor:', error);
            }
        }
    };

    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const csrfTokenElement = document.querySelector('meta[name="csrf-token"]');
        if (csrfTokenElement) {
            const csrfToken = csrfTokenElement.getAttribute('content');
            console.log(csrfToken);
        } else {
            console.error('No se encontró el token CSRF');
        }
    }, []);

    useEffect(() => {
        if (isLogin) {
            document.querySelector(".formulario__login").classList.add('active');
            document.querySelector(".formulario__register").classList.remove('active');
        } else {
            document.querySelector(".formulario__login").classList.remove('active');
            document.querySelector(".formulario__register").classList.add('active');
        }
    }, [isLogin]);

    return (
        <main>
            <div className="contenedor__todo">
                <div className="caja__trasera">
                    <div className="caja__trasera-login">
                        <h3>¿Ya tienes una cuenta?</h3>
                        <p>Inicia sesión para entrar en la página</p>
                        <center><button onClick={() => iniciarSesion(setIsLogin)}>Iniciar Sesión</button></center>
                    </div>
                    <div className="caja__trasera-register">
                        <h3>¿Aún no tienes una cuenta?</h3>
                        <p>Regístrate para que puedas iniciar sesión</p>
                        <center><button onClick={() => register(setIsLogin)}>Registrarse</button></center>
                    </div>
                </div>

                <div className="contenedor__login-register">
                <form className="formulario__login" onSubmit={handleLoginSubmit}>
                        <h2>Iniciar Sesión</h2>
                        <div className="input-container">
                            <span className="icon email-icon"></span>
                            <input type="email" name="email" placeholder="Correo Electrónico" required onChange={handleInputChange} />
                        </div>
                        <div className="input-container">
                            <span className="icon password-icon"></span>
                            <input type="password" name="password" placeholder="Contraseña" required onChange={handleInputChange} />
                        </div>
                        <center><button type="submit" className="btn-login">Entrar</button></center>
                    </form>
                    <form className="formulario__register" onSubmit={handleSubmit}>
                        <h2>Registrarse</h2>
                        <div className="input-container">
                            <span className="icon name-icon"></span>
                            <input type="text" name="name" placeholder="Nombre completo" required onChange={handleInputChange} />
                        </div>
                        <div className="input-container">
                            <span className="icon email-icon"></span>
                            <input type="email" name="email" placeholder="Correo Electrónico" required onChange={handleInputChange} />
                        </div>
                        <div className="input-container">
                            <span className="icon password-icon"></span>
                            <input type="password" name="password" placeholder="Contraseña" required onChange={handleInputChange} />
                        </div>
                        <div className="input-container">
                            <span className="icon password-icon"></span>
                            <input type="password" name="password_confirmation" placeholder="Confirmar Contraseña" required onChange={handleInputChange} />
                        </div>
                        <center><button type="submit" className="btn-register">Registrarse</button></center>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default Login;

if (document.getElementById('root')) {
    const Index = ReactDOM.createRoot(document.getElementById("root"));

    Index.render(
        <React.StrictMode>
            <Login/>
        </React.StrictMode>
    )
}
