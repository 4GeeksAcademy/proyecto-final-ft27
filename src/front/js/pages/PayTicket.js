import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/PayTicket.css";

export const PayTicket = () => {
    const { store } = useContext(Context);
    const [ticket, setTicket] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!store.token) {
            navigate('/');
            return;
        }
        fetchTicket();
    }, [store.token]);

    const fetchTicket = async () => {
        try {
            const response = await fetch(
                `${process.env.BACKEND_URL}/api/tickets/latest`,
                {
                    headers: {
                        "Authorization": `Bearer ${store.token}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Error fetching ticket information");
            }

            const data = await response.json();
            setTicket(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePayment = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await fetch(
                `${process.env.BACKEND_URL}/api/tickets/payment`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${store.token}`
                    },
                    body: JSON.stringify({
                        ticket_id: ticket.id,
                        payment_method: "credit_card" // Puedes modificarlo según lo que necesites
                    })
                }
            );

            if (!response.ok) {
                throw new Error("Error processing payment");
            }

            const data = await response.json();
            setSuccess("Payment processed successfully!");
            setTicket(data.ticket);

            // Navegar a la página principal después de un pago exitoso
            setTimeout(() => {
                navigate("/"); // Redirige a la página principal
            }, 2000); // Espera 2 segundos antes de redirigir (para que el usuario vea el mensaje de éxito)

            // Opcionalmente, refrescar el ticket
            setTimeout(() => {
                fetchTicket();
            }, 2000);

        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="container mt-5">
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">Loading ticket information...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4 text-primary">Informacion del Ticket</h2>

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

            {ticket ? (
                <div className="ticket-card shadow-lg border-0 rounded-4 mb-4">
                    <div className="p-3 ticket-card-header bg-primary text-white text-center">
                        <h4 className="mb-0">Detalles</h4>
                    </div>
                    <div className="ticket-card-body p-4">
                        <div className="row">
                            <div className="col-md-6">
                                <p><strong>🎮 Juego:</strong> {ticket.game_name}</p>
                                <p><strong>📅 Fecha:</strong> {new Date(ticket.created_at).toLocaleDateString()}</p>
                                <p>
                                    <strong>⚡ Estado:</strong>
                                    <span
                                        className={`ticket-badge ${ticket?.status === 'pending' ? 'bg-warning text-dark' : 'bg-success'} ms-2`}
                                    >
                                        {ticket?.status}
                                    </span>
                                </p>
                                <p><strong>💲 Total:</strong> ${ticket.total}</p>
                            </div>
                            <div className="col-md-6">
                                <h5 className="ticket-card-title">🔢 Números:</h5>
                                <div className="d-flex flex-wrap justify-content-start gap-2">
                                    {ticket.selected_numbers.map((number, index) => (
                                        <span
                                            key={index}
                                            className="ticket-number-badge text-white d-flex align-items-center justify-content-center"
                                        >
                                            {number}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {ticket.status === 'pending' && (
                            <div className="text-center mt-4">
                                <button
                                    className="ticket-btn-lg btn btn-success btn-lg rounded-pill px-5"
                                    onClick={handlePayment}
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <span className="ticket-spinner-border-sm spinner-border spinner-border-sm me-2" />
                                            Procesando pago...
                                        </>
                                    ) : (
                                        <>
                                            <i className="fas fa-credit-card me-2"></i>
                                            Pagar
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                </div>

            ) : (
                <div className="alert alert-info">
                    Informacion no disponible.
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

export default PayTicket;
