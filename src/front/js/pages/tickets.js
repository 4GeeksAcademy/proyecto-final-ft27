import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/tickets.css";

export const Tickets = () => {
    const { store } = useContext(Context);
    const [tickets, setTickets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!store.token) {
            navigate('/');
            return;
        }
        fetchTickets();
    }, [store.token]);

    const fetchTickets = async () => {
        try {
            const response = await fetch(
                `${process.env.BACKEND_URL}/api/tickets/pending`,
                {
                    headers: {
                        "Authorization": `Bearer ${store.token}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Error fetching tickets information");
            }

            const data = await response.json();
            setTickets(data.tickets); // Extraer y guardar solo la lista de tickets
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePayment = async (ticketId) => {
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
                        ticket_id: ticketId,
                        payment_method: "credit_card"
                    })
                }
            );

            if (!response.ok) {
                throw new Error("Error processing payment");
            }

            const data = await response.json();
            setSuccess("Payment processed successfully!");

            // Redirigir a la página principal después de un pago exitoso
            setTimeout(() => {
                navigate("/"); // Redirige a la página principal
            }, 2000); // Espera 2 segundos antes de redirigir (para que el usuario vea el mensaje de éxito)
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
                    <p className="mt-2">Loading tickets...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4 text-primary">Tickets Pendientes</h2>

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

            {tickets.length > 0 ? (
                tickets.map((ticket) => (
                    <div key={ticket.id} className="ticket-card shadow-lg border-0 rounded-4 mb-4">
                        <div className="p-3 ticket-card-header bg-primary text-white text-center">
                            <h4 className="mb-0">Detalles del Ticket</h4>
                        </div>
                        <div className="ticket-card-body p-4">
                            <div className="row">
                                <div className="col-md-6">
                                    <p><strong>🎮 Juego:</strong> {ticket.game_name}</p>
                                    <p><strong>📅 Fecha:</strong> {new Date(ticket.created_at).toLocaleDateString()}</p>
                                    <p>
                                        <strong>⚡ Estado:</strong>
                                        <span className="ticket-badge bg-warning text-dark ms-2">
                                            {ticket.status}
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

                            <div className="text-center mt-4">
                                <button
                                    className="ticket-btn-lg btn btn-primary btn-lg rounded-pill px-5"
                                    onClick={() => handlePayment(ticket.id)}
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
                                            Generar pago
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="alert alert-info">
                    No tienes tickets pendientes de pago.
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

export default Tickets;
