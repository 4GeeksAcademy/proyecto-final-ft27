import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Bitcoin = () => {
    const { store, actions } = useContext(Context);
    const [selectedBitcoin, setSelectedBitcoin] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

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
    };

    const clearSelection = () => {
        setSelectedBitcoin([]);
        setError(null);
        setSuccess(null);
    };

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Please login first");
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
                    game_type: "Reto ultra Millonario",
                    numbers: selectedBitcoin
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Error submitting numbers");
            }

            setSuccess("Numbers selected successfully!");
            setError(null);

            // Optional: Redirect to results page after successful submission
            setTimeout(() => navigate("/results"), 2000);

        } catch (error) {
            setError(error.message);
            setSuccess(null);
        }
    };

    return (
        <div className="container text-center py-4">
            <h1 className="fw-bold mb-4" style={{ fontSize: "3rem" }}>
                Reto ultra Millonario
            </h1>
            
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            
            {success && (
                <div className="alert alert-success" role="alert">
                    {success}
                </div>
            )}

            <h1 className="fw-bold text-primary mb-4" style={{ fontSize: "2rem" }}>
                ¡Selecciona tus números de la suerte!
            </h1>
            
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
                            disabled={!isSelected && selectedBitcoin.length >= 14}
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
                    disabled={selectedBitcoin.length === 14}
                >
                    Selección Aleatoria
                </button>
                <button
                    className="btn btn-danger text-white mx-2"
                    onClick={clearSelection}
                    disabled={selectedBitcoin.length === 0}
                >
                    Borrar Selección
                </button>
                <button
                    className="btn btn-success text-white mx-2"
                    onClick={handleSubmit}
                    disabled={selectedBitcoin.length !== 14}
                >
                    Confirmar Selección
                </button>
            </div>

            <div className="text-center mt-4 mb-4">
                <Link to="/" className="btn btn-primary btn-lg shadow-lg">VOLVER</Link>
            </div>
        </div>
    );
};

export default Bitcoin;