import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Componente Navbar
const Navbar = () => {
    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <Link to="/">
                    <span className="navbar-brand mb-0 h1">Lotería</span>
                </Link>
                <div className="ml-auto">
                    <Link to="/login">
                        <button className="btn btn-primary me-2">Ingresar</button>
                    </Link>
                    <div className="dropdown d-inline">
                        <button
                            className="btn btn-light dropdown-toggle"
                            type="button"
                            id="menuDropdown"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end">
                            <li>
                                <Link className="dropdown-item" to="/live-draws">
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
        </nav>
    );
};

// Página de Inicio
const Home = () => {
    return (
        <div className="container my-4 text-center">
            <h1>Bienvenidos a la Lotería</h1>
            <p className="lead">Descubre los últimos resultados y juega de manera responsable.</p>
            <div className="d-flex justify-content-center gap-3">
                <button className="btn btn-primary">Ver Resultados</button>
                <button className="btn btn-warning">Juego Responsable</button>
            </div>
        </div>
    );
};

// Página de Resultados
const Results = () => {
    return (
        <div className="container my-4">
            <h2>Resultados</h2>
            <p>Aquí encontrarás los resultados más recientes.</p>
        </div>
    );
};

// Página de Juego Responsable
const ResponsiblePlay = () => {
    return (
        <div className="container my-4">
            <h2>Juego Responsable</h2>
            <p>Información sobre cómo jugar de manera responsable.</p>
        </div>
    );
};

// Página de Login
const Login = () => {
    return (
        <div className="container my-4">
            <h2>Iniciar Sesión</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Correo Electrónico
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Ingrese su correo"
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
                        placeholder="Ingrese su contraseña"
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Ingresar
                </button>
            </form>
        </div>
    );
};

// Página de Sorteos en Vivo
const LiveDraws = () => {
    return (
        <div className="container my-4">
            <h2>Sorteos en Vivo</h2>
            <p>Disfruta de los sorteos en tiempo real.</p>
        </div>
    );
};

// Página de Ganadores
const Winners = () => {
    return (
        <div className="container my-4">
            <h2>Ganadores</h2>
            <p>Consulta la lista de ganadores.</p>
        </div>
    );
};

// App Principal
const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/results" element={<Results />} />
                <Route path="/responsible-play" element={<ResponsiblePlay />} />
                <Route path="/login" element={<Login />} />
                <Route path="/live-draws" element={<LiveDraws />} />
                <Route path="/winners" element={<Winners />} />
            </Routes>
        </Router>
    );
};

// Renderizar la Aplicación
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);