import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/navbar.css";

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [modal, setModal] = useState(null);

    useEffect(() => {
        // Initialize Bootstrap modal
        const modalElement = document.getElementById('loginModal');
        if (modalElement) {
            setModal(new bootstrap.Modal(modalElement));
        }
    }, []);

    const handleInputChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.id]: e.target.value
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const success = await actions.login(loginData.email, loginData.password);
            if (success) {
                modal?.hide();
                setLoginData({ email: "", password: "" });
            } else {
                setError("Credenciales inválidas");
            }
        } catch (error) {
            setError("Error al iniciar sesión");
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        actions.logout();
        navigate('/');
    };

    const handleRegisterClick = () => {
        modal?.hide();
        navigate('/register');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
            <div className="container">
                <Link to="/" className="navbar-brand fw-bold">
                    <i className="fas fa-ticket-alt me-2"></i>Lotería
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item dropdown">
                            <button
                                className="nav-link dropdown-toggle btn btn-link"
                                id="gamesDropdown"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Nuestros Juegos
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="gamesDropdown">
                                <li>
                                    <Link className="dropdown-item" to="/bitcoin">
                                        Reto ultra Millonario
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/dollar">
                                        Carrera del Dinero
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/results">
                                Resultados
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/winners">
                                Ganadores
                            </Link>
                        </li>
                    </ul>

                    <div className="d-flex align-items-center">
                        {store.user ? (
                            <>
                                <span className="text-light me-3">
                                    Hola, {store.user.email}
                                </span>
                                <button
                                    className="btn btn-light"
                                    onClick={handleLogout}
                                >
                                    Cerrar Sesión
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    className="btn btn-light me-2"
                                    type="button"
                                    data-bs-toggle="modal"
                                    data-bs-target="#loginModal"
                                >
                                    Iniciar Sesión
                                </button>
                                <Link to="/register" className="btn btn-outline-light">
                                    Registrarse
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Login Modal */}
            <div
                className="modal fade"
                id="loginModal"
                tabIndex="-1"
                aria-labelledby="loginModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header bg-primary text-white">
                            <h5 className="modal-title" id="loginModalLabel">
                                Iniciar Sesión
                            </h5>
                            <button
                                type="button"
                                className="btn-close btn-close-white"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            {error && (
                                <div className="alert alert-danger alert-dismissible fade show">
                                    {error}
                                    <button 
                                        type="button" 
                                        className="btn-close" 
                                        onClick={() => setError(null)}
                                        aria-label="Close"
                                    ></button>
                                </div>
                            )}
                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={loginData.email}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        Contraseña
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={loginData.password}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                                <button 
                                    type="submit" 
                                    className="btn btn-primary w-100"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            Iniciando sesión...
                                        </>
                                    ) : (
                                        'Iniciar Sesión'
                                    )}
                                </button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <p className="w-100 text-center">
                                ¿No tienes cuenta? {' '}
                                <button 
                                    className="btn btn-link p-0"
                                    onClick={handleRegisterClick}
                                >
                                    Regístrate aquí
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;