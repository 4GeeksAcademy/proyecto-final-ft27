// pages/resultados.js
import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Results = () => {
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
                        payment_method: "credit_card" // You can modify this based on your needs
                    })
                }
            );

            if (!response.ok) {
                throw new Error("Error processing payment");
            }

            const data = await response.json();
            setSuccess("Payment processed successfully!");
            setTicket(data.ticket);
            
            // Optionally redirect to a success page or refresh the ticket
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
            <h2 className="text-center mb-4 text-primary">Ticket Information</h2>

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
                <div className="card shadow-sm mb-4">
                    <div className="card-header bg-primary text-white">
                        <h4 className="mb-0">Ticket Details</h4>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6">
                                <h5 className="card-title">Game Information</h5>
                                <p><strong>Game:</strong> {ticket.game_name}</p>
                                <p><strong>Draw Date:</strong> {new Date(ticket.created_at).toLocaleDateString()}</p>
                                <p><strong>Status:</strong> 
                                    <span className={`badge ${ticket?.status === 'pending' ? 'bg-warning' : 'bg-success'} ms-2`}>
                                        {ticket?.status}
                                    </span>
                                </p>
                                <p><strong>Total:</strong> ${ticket.total}</p>
                            </div>
                            <div className="col-md-6">
                                <h5 className="card-title">Selected Numbers</h5>
                                <div className="d-flex flex-wrap gap-2">
                                    {ticket.selected_numbers.map((number, index) => (
                                        <span 
                                            key={index} 
                                            className="badge bg-primary p-2"
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
                                    className="btn btn-success btn-lg"
                                    onClick={handlePayment}
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" />
                                            Processing Payment...
                                        </>
                                    ) : (
                                        <>
                                            <i className="fas fa-credit-card me-2"></i>
                                            Generate Preference
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="alert alert-info">
                    No ticket information available.
                </div>
            )}

            <div className="text-center mt-4 mb-4">
                <Link to="/" className="btn btn-primary btn-lg shadow-lg">
                    <i className="fas fa-home me-2"></i>
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default Results;