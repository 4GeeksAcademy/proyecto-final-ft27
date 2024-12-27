import React from "react";
import { Link } from "react-router-dom";
import "../../styles/NotFound.css";

export const NotFound = () => {
    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100" style={{ backgroundColor: "#f8f9fa" }}>
            <div className="text-center">
                <h1 className="display-1 text-danger">404</h1>
                <h2 className="text-secondary">¡Página no encontrada!</h2>
                <p className="lead text-muted">Lo sentimos, la página que buscas no existe o ha sido removida.</p>
                <Link to="/" className="btn btn-primary mt-4">Volver a la Página Principal</Link>
            </div>
        </div>
    );
};

export default NotFound;
