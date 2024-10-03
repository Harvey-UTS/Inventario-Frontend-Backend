import React from 'react';
import '../../../css/gestorai.css';

const Gestor_Inactivo = ({ gestores, handleSwitchChange }) => {
    const handleSwitchChangeWithConfirm = (gestor) => {
        const confirmation = window.confirm(`¿Estás seguro de que deseas cambiar el estado de ${gestor.nombre} ${gestor.apellido}?`);
        if (confirmation) {
            handleSwitchChange(gestor);
        }
    };

    return (
        <div className="gestores-cards">
            <div className="header">
                <h2>Gestores Ventas</h2>
            </div>
            {gestores.map((gestor, index) => (
                <div className="gestor-card" key={index}>
                    <h3>{gestor.nombre} {gestor.apellido}</h3>
                    <label className="switch">
                        <input 
                            type="checkbox" 
                            checked={gestor.estado === 'Activo'} 
                            onChange={() => handleSwitchChangeWithConfirm(gestor)} 
                        />
                        <span className="slider"></span>
                    </label>
                    <p>{gestor.estado === 'Activo' ? 'Activado' : 'Desactivado'}</p>
                </div>
            ))}
        </div>
    );
};

export default Gestor_Inactivo;