import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/TicketHistory.css";

export const TicketsHistory = () => {
    const { store } = useContext(Context);
    const [tickets, setTickets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
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
                `${process.env.BACKEND_URL}/api/user/tickets`,
                {
                    headers: {
                        "Authorization": `Bearer ${store.token}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch tickets");
            }

            const data = await response.json();

            // Verificar si el formato de datos es correcto
            if (!Array.isArray(data.tickets)) {
                throw new Error("Unexpected response format");
            }

            setTickets(data.tickets);
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
                    <p className="mt-2">Loading tickets history...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4 text-primary">Historial de Tickets</h2>

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

            {tickets.length > 0 ? (
                tickets.map((ticket, index) => (
                    <div key={ticket.id || index} className="ticket-card shadow-lg border-0 rounded-4 mb-4">
                        <div className="ticket-card-header bg-primary text-white text-center p-3">
                            <h5 className="mb-0 fs-2">Ticket #{ticket.id || "N/A"}</h5>
                        </div>
                        <div className="ticket-card-body p-4">
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <p><strong>🎮 Juego:</strong> {ticket.game_name || "Desconocido"}</p>
                                    <p><strong>📅 Fecha de Compra:</strong> {ticket.created_at ? new Date(ticket.created_at).toLocaleDateString() : "N/A"}</p>
                                    <p>
                                        <strong>⚡ Estado:</strong>
                                        <span
                                            className={`status-badge ${ticket.status === "pending" ? "bg-warning text-dark" : "bg-success"} ms-2`}
                                        >
                                            {ticket.status || "N/A"}
                                        </span>
                                    </p>
                                    <p><strong>💲 Total:</strong> ${ticket.total || 0}</p>
                                </div>
                                <div className="col-md-6">
                                    <h5 className="ticket-card-title">🔢 Números:</h5>
                                    <div className="d-flex flex-wrap gap-2 justify-content-start">
                                        {ticket.selected_numbers && ticket.selected_numbers.length > 0 ? (
                                            ticket.selected_numbers.map((number, i) => (
                                                <span
                                                    key={i}
                                                    className="ticket-number-badge text-white d-flex align-items-center justify-content-center"
                                                >
                                                    {number}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-muted">No seleccionados</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="alert alert-info">
                    No se han encontrado tickets.
                </div>
            )}

            <div className="text-center mt-4 mb-4">
                <Link to="/" className="btn btn-primary btn-lg shadow-lg">
                    <i className="fas fa-home me-2"></i>
                    Volver
                </Link>
            </div>
        </div>
    );
};

export default TicketsHistory;
