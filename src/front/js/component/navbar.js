import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Importa useLocation
import { Context } from "../store/appContext";
import "../../styles/navbar.css";

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const location = useLocation(); // Hook para obtener la ruta actual
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [modal, setModal] = useState(null);

    useEffect(() => {
        const modalElement = document.getElementById("loginModal");
        if (modalElement) {
            setModal(new bootstrap.Modal(modalElement));
        }
    }, []);

    // Cierra el modal cuando se navega a la página de registro
    useEffect(() => {
        if (location.pathname === "/register") {
            modal?.hide();
        }
    }, [location, modal]); // Se ejecuta cada vez que cambie la ruta

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

    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await actions.logout(); // Asegúrate de que `logout` sea una función asíncrona.
            navigate("/");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        } finally {
            setIsLoggingOut(false);
        }
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
                        <li className="nav-item dropdown">
                            <button
                                className="nav-link dropdown-toggle btn btn-link"
                                id="responsibleGamingDropdown"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Juega Responsable
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="responsibleGamingDropdown">
                                <li>
                                    <Link className="dropdown-item" to="/ley20393">
                                        Ley 20.393
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>

                    <div className="d-flex align-items-center">
                        {store.user ? (
                            <>
                                <span className="text-light me-3 p-2 rounded bg-secondary fw-bold d-flex align-items-center">
                                    <i className="fas fa-user-circle me-2"></i> Hola, {store.user.email}
                                </span>
                                <button
                                    className="btn btn-light me-2"
                                    onClick={handleLogout}
                                    disabled={isLoggingOut}
                                >
                                    {isLoggingOut ? (
                                        <>
                                            <span
                                                className="spinner-border spinner-border-sm me-2"
                                                role="status"
                                                aria-hidden="true"
                                            ></span>
                                            Cerrando sesión...
                                        </>
                                    ) : (
                                        "Salir"
                                    )}
                                </button>
                            </>
                        ) : (
                            <button
                                className="btn btn-light me-2"
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#loginModal"
                            >
                                Iniciar Sesión
                            </button>
                        )}
                        <div className="dropdown">
                            <button
                                className="btn btn-light dropdown-toggle"
                                type="button"
                                id="menuDropdown"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Más
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="menuDropdown">
                                <li>
                                    <Link className="dropdown-item" to="/TicketsHistory">
                                        Mis Tickets
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/live">
                                        Sorteos en Vivo
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/winners">
                                        Ganadores
                                    </Link>
                                </li>
                            </ul>
                        </div>
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
                            <h5 className="modal-title w-100 text-center" id="loginModalLabel">
                                Bienvenido
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
                            <form className="text-primary" onSubmit={handleLogin}>
                                <div className="mb-4 text-center">
                                    <label htmlFor="emailStep" className="form-label fw-bold fs-5 text-dark">
                                        Ingresa tu correo electrónico
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={loginData.email}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="ejemplo@email.com"
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="mb-4 text-center">
                                    <label htmlFor="passwordStep" className="form-label fw-bold fs-5 text-dark">
                                        ingresa tu contraseña
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={loginData.password}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="********"
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
                                        "Iniciar Sesión"
                                    )}
                                </button>
                            </form>
                        </div>
                        <div className="modal-footer text-center">
                            <p className="w-100 m-0 text-dark">
                                ¿No tienes cuenta? <Link to="/register" className="text-primary">Regístrate aquí</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
