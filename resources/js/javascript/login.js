export const handleResize = () => {
    const cajaTraseraRegister = document.querySelector(".caja__trasera-register");
    const cajaTraseraLogin = document.querySelector(".caja__trasera-login");
    const formularioLogin = document.querySelector(".formulario__login");
    const formularioRegister = document.querySelector(".formulario__register");
    const contenedorLoginRegister = document.querySelector(".contenedor__login-register");

    if (window.innerWidth <= 850) {
        cajaTraseraRegister.style.display = "block";
        cajaTraseraLogin.style.display = "none";
        formularioLogin.style.display = "block";
        contenedorLoginRegister.style.left = "0px";
        formularioRegister.style.display = "none";
    } else {
        cajaTraseraRegister.style.display = "block";
        cajaTraseraLogin.style.display = "block";
    }
};

export const iniciarSesion = (setIsLogin) => {
    if (window.innerWidth > 850) {
        setIsLogin(true);
        document.querySelector(".contenedor__login-register").style.left = "10px";
    } else {
        setIsLogin(true);
        document.querySelector(".contenedor__login-register").style.left = "0px";
    }
};

export const register = (setIsLogin) => {
    if (window.innerWidth > 850) {
        setIsLogin(false);
        document.querySelector(".contenedor__login-register").style.left = "410px";
    } else {
        setIsLogin(false);
        document.querySelector(".contenedor__login-register").style.left = "0px";
    }
};