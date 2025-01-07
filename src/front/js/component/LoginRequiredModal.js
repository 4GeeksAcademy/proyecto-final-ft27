import React from "react";

export const LoginRequiredModal = () => {
    return (
        <div className="modal fade" id="loginRequiredModal" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Inicio de sesión requerido</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        <p>Debes iniciar sesión para acceder a esta función.</p>
                    </div>
                    <div className="modal-footer">
                        <button 
                            type="button" 
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Cancelar
                        </button>
                        <button 
                            type="button" 
                            className="btn btn-primary"
                            data-bs-dismiss="modal"
                            onClick={() => document.querySelector('[data-bs-target="#loginModal"]').click()}
                        >
                            Iniciar Sesión
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};