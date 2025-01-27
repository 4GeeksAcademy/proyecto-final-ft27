import React from "react";
import "../../styles/LoginRequiredModal.css";

export const LoginRequiredModal = () => {
    return (
        <div className="modal fade" id="loginRequiredModal" tabIndex="-1" aria-labelledby="loginRequiredModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0 shadow-lg">
                    <div className="modal-header bg-primary text-white">
                        <h5 className="modal-title w-100 text-center" id="loginRequiredModalLabel">Inicio de sesión requerido</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                    </div>
                    <div className="modal-body text-center">
                        <p className="mb-4">Para poder ingresar a esta página, debes iniciar sesión.</p>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                            alt="Inicio de sesión requerido"
                            className="img-fluid rounded-circle"
                        />
                    </div>
                    <div className="modal-footer justify-content-center">
                        <button
                            type="button"
                            className="btn btn-secondary px-4"
                            data-bs-dismiss="modal"
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary px-4"
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