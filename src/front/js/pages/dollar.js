import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Dollar = () => {
    const { store, actions } = useContext(Context);
    const [selectedDollar, setSelectedDollar] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSelect = (id) => {
        if (selectedDollar.includes(id)) {
            setSelectedDollar(selectedDollar.filter(num => num !== id));
        } else if (selectedDollar.length < 14) {
            setSelectedDollar([...selectedDollar, id]);
        }
    };

    const handleRandomSelect = () => {
        const numbers = Array.from({ length: 25 }, (_, i) => i + 1);
        const shuffled = numbers.sort(() => Math.random() - 0.5);
        const randomSelection = shuffled.slice(0, 14);
        setSelectedDollar(randomSelection);
        setError(null);
    };

    const clearSelection = () => {
        setSelectedDollar([]);
        setError(null);
        setSuccess(null);
    };

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const token = localStorage.getItem("token");
            if (!token) {
                setError("Por favor, inicia sesión primero");
                navigate("/login");
                return;
            }

            const response = await fetch(process.env.BACKEND_URL + "/api/select_numbers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    game_type: "Carrera del Dinero",
                    numbers: selectedDollar.sort((a, b) => a - b)
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Error al enviar los números");
            }

            setSuccess("¡Números seleccionados exitosamente!");
            
            // Opcional: Mostrar información adicional del sorteo
            const drawDate = new Date(data.draw_date);
            setSuccess(`¡Números seleccionados exitosamente! El sorteo será el ${drawDate.toLocaleDateString()}`);

            // Redireccionar después de un tiempo
            setTimeout(() => navigate("/results"), 2000);

        } catch (error) {
            setError(error.message);
            setSuccess(null);
        } finally {
            setIsLoading(false);
        }
    };

    const renderNumbers = () => {
        return Array.from({ length: 25 }, (_, index) => {
            const number = index + 1;
            const isSelected = selectedDollar.includes(number);
            return (
                <button
                    key={`dollar-${number}`}
                    className={`btn rounded-circle ${
                        isSelected ? "btn-success shadow-lg" : "btn-primary shadow-sm"
                    } w-100`}
                    style={{ 
                        height: "60px", 
                        fontSize: "18px", 
                        fontWeight: "bold",
                        transition: "all 0.3s ease"
                    }}
                    onClick={() => handleSelect(number)}
                    disabled={!isSelected && selectedDollar.length >= 14}
                >
                    {number}
                </button>
            );
        });
    };

    return (
        <div className="container text-center py-4">
            <h1 className="fw-bold mb-4" style={{ fontSize: "3rem" }}>
                Carrera del Dinero
            </h1>

            {error && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    {error}
                    <button 
                        type="button" 
                        className="btn-close" 
                        onClick={() => setError(null)}
                        aria-label="Close"
                    ></button>
                </div>
            )}

            {success && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    {success}
                    <button 
                        type="button" 
                        className="btn-close" 
                        onClick={() => setSuccess(null)}
                        aria-label="Close"
                    ></button>
                </div>
            )}

            <div className="card shadow-sm mb-4">
                <div className="card-body">
                    <h2 className="fw-bold text-primary mb-4">
                        ¡Selecciona tus números de la suerte!
                    </h2>
                    <p className="text-muted mb-4">
                        Selecciona 14 números entre 1 y 25
                    </p>

                    <div className="d-grid gap-3" 
                        style={{ 
                            gridTemplateColumns: "repeat(5, 1fr)", 
                            maxWidth: "400px", 
                            margin: "0 auto" 
                        }}>
                        {renderNumbers()}
                    </div>

                    <div className="mt-4">
                        <div className="d-flex justify-content-center gap-2 flex-wrap">
                            <button
                                className="btn btn-warning text-white"
                                onClick={handleRandomSelect}
                                disabled={isLoading || selectedDollar.length === 14}
                            >
                                <i className="fas fa-random me-2"></i>
                                Selección Aleatoria
                            </button>

                            <button
                                className="btn btn-danger text-white"
                                onClick={clearSelection}
                                disabled={isLoading || selectedDollar.length === 0}
                            >
                                <i className="fas fa-trash-alt me-2"></i>
                                Borrar Selección
                            </button>

                            <button
                                className="btn btn-success text-white"
                                onClick={handleSubmit}
                                disabled={isLoading || selectedDollar.length !== 14}
                            >
                                {isLoading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Procesando...
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-check me-2"></i>
                                        Confirmar Selección
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card shadow-sm mb-4">
                <div className="card-body">
                    <h3 className="text-primary mb-3">Números Seleccionados</h3>
                    {selectedDollar.length > 0 ? (
                        <div className="d-flex flex-wrap justify-content-center gap-2">
                            {selectedDollar.sort((a, b) => a - b).map(number => (
                                <span key={`selected-${number}`} className="badge bg-success fs-6 p-2">
                                    {number}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <p className="text-muted">No has seleccionado ningún número aún</p>
                    )}
                </div>
            </div>

            <div className="text-center mt-4 mb-4">
                <Link to="/" className="btn btn-primary btn-lg shadow-lg">
                    <i className="fas fa-home me-2"></i>
                    VOLVER
                </Link>
            </div>
        </div>
    );
};

export default Dollar;