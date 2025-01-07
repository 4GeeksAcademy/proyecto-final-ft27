import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/register.css";

export const Register = () => {
    const { actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            // Validate passwords match
            if (password !== confirmPassword) {
                setError("Las contraseñas no coinciden");
                return;
            }

            const response = await fetch(process.env.BACKEND_URL + "/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                // Auto login after successful registration
                const loginSuccess = await actions.login(email, password);
                if (loginSuccess) {
                    navigate("/");
                } else {
                    setError("Registro exitoso pero hubo un error al iniciar sesión automáticamente");
                }
            } else {
                setError(data.error || "Error en el registro");
            }
        } catch (error) {
            setError("Error de conexión");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header bg-primary text-white text-center">
                            <h3>Crear una cuenta</h3>
                        </div>
                        <div className="card-body">
                            {error && (
                                <div className="alert alert-danger alert-dismissible fade show">
                                    {error}
                                    <button 
                                        type="button" 
                                        className="btn-close" 
                                        onClick={() => setError(null)}
                                    ></button>
                                </div>
                            )}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        Correo Electrónico
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="ejemplo@correo.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
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
                                        placeholder="********"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        disabled={isLoading}
                                        minLength="6"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="confirmPassword" className="form-label">
                                        Confirmar Contraseña
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="confirmPassword"
                                        placeholder="********"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        disabled={isLoading}
                                        minLength="6"
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
                                            Registrando...
                                        </>
                                    ) : (
                                        'Registrarse'
                                    )}
                                </button>
                            </form>
                        </div>
                        <div className="card-footer text-center">
                            <p className="mb-0">
                                ¿Ya tienes una cuenta? {' '}
                                <Link to="/" className="text-primary">
                                    Inicia sesión aquí
                                </Link>
                            </p>
                        </div>
                    </div>
                    <div className="text-center mt-4 mb-4">
                        <Link to="/" className="btn btn-primary btn-lg shadow-lg">VOLVER</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;