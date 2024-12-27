import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";

export const Navbar = () => {
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
            <button
              className="btn btn-light me-2"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#loginModal"
            >
              Iniciar Sesión
            </button>

            <div className="dropdown">
              <button
                className="btn btn-outline-light dropdown-toggle"
                type="button"
                id="menuDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Más
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="menuDropdown">
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
              <form>
                
                <div className="mb-4 text-center">
                  <label htmlFor="emailStep" className="form-label fw-bold fs-5 text-dark">
                    Ingresa tu correo electrónico
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="emailStep"
                    placeholder="ejemplo@correo.com"
                    required
                  />
                </div>

                
                <div className="mb-4 text-center">
                  <label htmlFor="passwordStep" className="form-label fw-bold fs-5 text-dark">
                    ingresa tu contraseña
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="passwordStep"
                    placeholder="********"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2"
                >
                  Iniciar Sesión
                </button>
              </form>
            </div>
            <div className="modal-footer text-center">
              <p className="w-100 m-0 text-dark">
                ¿No tienes cuenta? <a href="#" className="text-primary">Regístrate aquí</a>
              </p>
            </div>
          </div>
        </div>
      </div>

    </nav>
  );
};
