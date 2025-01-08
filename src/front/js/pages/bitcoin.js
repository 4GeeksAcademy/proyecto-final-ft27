// pages/bitcoin.js
import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Bitcoin = () => {
    const { store, actions } = useContext(Context);
    const [selectedBitcoin, setSelectedBitcoin] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [ticketCreated, setTicketCreated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!store.user) {
            navigate('/');
            return;
        }
    }, [store.user, navigate]);

    const handleSelect = (id) => {
        const updatedSelection = selectedBitcoin.includes(id)
            ? selectedBitcoin.filter((item) => item !== id)
            : selectedBitcoin.length < 14
                ? [...selectedBitcoin, id]
                : selectedBitcoin;

        setSelectedBitcoin(updatedSelection);
    };

    const handleRandomSelect = () => {
        const randomNumbers = Array.from({ length: 25 }, (_, i) => i + 1)
            .sort(() => Math.random() - 0.5)
            .slice(0, 14);
        setSelectedBitcoin(randomNumbers);
        setError(null);
    };

    const clearSelection = () => {
        setSelectedBitcoin([]);
        setError(null);
        setSuccess(null);
        setTicketCreated(false);
    };

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            setError(null);

            if (!store.token) {
                setError("Por favor, inicia sesión primero");
                navigate("/");
                return;
            }

            const response = await fetch(process.env.BACKEND_URL + "/api/select_numbers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${store.token}`
                },
                body: JSON.stringify({
                    game_type: "Reto ultra Millonario",
                    numbers: selectedBitcoin,
                    total: 5.00, // Set your ticket price here
                    preference: "bitcoin_game"
                })
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 401) {
                    actions.logout();
                    navigate("/");
                    throw new Error("Sesión expirada. Por favor, inicia sesión nuevamente.");
                }
                throw new Error(data.error || "Error al enviar los números");
            }

            setSuccess("¡Números seleccionados exitosamente!");
            setTicketCreated(true);

            // Redirect to results page after short delay
            setTimeout(() => {
                navigate("/results", { 
                    state: { 
                        ticketId: data.ticket_id,
                        gameType: "Reto ultra Millonario",
                        numbers: selectedBitcoin
                    }
                });
            }, 1500);

        } catch (error) {
            setError(error.message);
            setSuccess(null);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container text-center py-4">
            <h1 className="fw-bold mb-4" style={{ fontSize: "3rem" }}>
                Reto ultra Millonario
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

            <h2 className="fw-bold text-primary mb-4" style={{ fontSize: "2rem" }}>
                ¡Selecciona tus números de la suerte!
            </h2>
            
            <div className="d-grid gap-3" style={{ gridTemplateColumns: "repeat(5, 1fr)", maxWidth: "400px", margin: "0 auto" }}>
                {Array.from({ length: 25 }, (_, index) => {
                    const id = index + 1;
                    const isSelected = selectedBitcoin.includes(id);
                    return (
                        <button
                            key={`bitcoin-${id}`}
                            className={`btn rounded-circle ${isSelected ? "btn-success shadow-lg" : "btn-primary shadow-sm"} w-100`}
                            style={{ height: "60px", fontSize: "18px", fontWeight: "bold" }}
                            onClick={() => handleSelect(id)}
                            disabled={!isSelected && selectedBitcoin.length >= 14 || isLoading || ticketCreated}
                        >
                            {id}
                        </button>
                    );
                })}
            </div>

            <div className="mt-4">
                <button
                    className="btn btn-warning text-white mx-2"
                    onClick={handleRandomSelect}
                    disabled={isLoading || selectedBitcoin.length === 14 || ticketCreated}
                >
                    <i className="fas fa-random me-2"></i>
                    Selección Aleatoria
                </button>
                <button
                    className="btn btn-danger text-white mx-2"
                    onClick={clearSelection}
                    disabled={isLoading || selectedBitcoin.length === 0}
                >
                    <i className="fas fa-trash-alt me-2"></i>
                    Borrar Selección
                </button>
                <button
                    className="btn btn-success text-white mx-2"
                    onClick={handleSubmit}
                    disabled={isLoading || selectedBitcoin.length !== 14 || ticketCreated}
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

            {ticketCreated && (
                <div className="alert alert-info mt-4">
                    <i className="fas fa-info-circle me-2"></i>
                    Redirigiendo a la página de pago...
                </div>
            )}

            <div className="text-center mt-4 mb-4">
                <Link to="/" className="btn btn-primary btn-lg shadow-lg">
                    <i className="fas fa-home me-2"></i>
                    VOLVER
                </Link>
            </div>
        </div>
    );
};

export default Bitcoin;