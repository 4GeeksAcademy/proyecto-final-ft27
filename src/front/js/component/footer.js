import React from "react";
import "../../styles/footer.css";

export const Footer = () => {
    return (
        <footer className="footer bg-dark text-light py-4 mt-4">
            <div className="container">
                <div className="row text-center">
                    <div className="col-12 col-md-4 mb-3">
                        <i className="fas fa-certificate fa-3x text-warning mb-2"></i>
                        <p className="mb-0">World Lottery Association Certified</p>
                    </div>
                    <div className="col-12 col-md-4 mb-3">
                        <i className="fas fa-user-graduate fa-3x text-info mb-2"></i>
                        <p className="mb-0">Para mayores de 18+</p>
                    </div>
                    <div className="col-12 col-md-4 mb-3">
                        <i className="fas fa-user-check fa-3x text-success mb-2"></i>
                        <p className="mb-0">Juega Responsable 18+</p>
                    </div>
                </div>
                <div className="text-center mt-4">
                    <p className="mb-0 small">
                        © {new Date().getFullYear()} LuckyWinner. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
};
