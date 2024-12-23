import React from "react";
import { Link } from "react-router-dom";

// Navbar component
export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">Loteria</span>
        </Link>


        <div className="dropdown me-2">
          <button
            className="btn btn-light dropdown-toggle"
            type="button"
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
        </div>


        <div className="dropdown me-2">
          <button
            className="btn btn-light dropdown-toggle"
            type="button"
            id="responsibleGamingDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Juega Responsable!
          </button>
          <ul className="dropdown-menu" aria-labelledby="responsibleGamingDropdown">
            <li>
              <Link className="dropdown-item" to="/ley20393">
                Ley 20.393
              </Link>
            </li>
          </ul>
        </div>

        <div className="ms-auto d-flex">

          <div className="dropdown me-2">
            <button
              className="btn btn-primary"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#loginModal"
            >
              Enter
            </button>
          </div>


          <div className="dropdown">
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
                  Sorteos en vivo!
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

      {/* Login Modal */}
      <div
        className="modal fade"
        id="loginModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="loginModalLabel"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="loginModalLabel">Login</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};