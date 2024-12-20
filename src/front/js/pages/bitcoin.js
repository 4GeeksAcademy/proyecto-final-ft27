import React, { useState } from "react";

export const Bitcoin = ({ onSelectionChange }) => {
    const [selectedBitcoin, setSelectedBitcoin] = useState([]);

    const handleSelect = (id) => {
        const updatedSelection = selectedBitcoin.includes(id)
            ? selectedBitcoin.filter((item) => item !== id)
            : selectedBitcoin.length < 14
                ? [...selectedBitcoin, id]
                : selectedBitcoin;

        setSelectedBitcoin(updatedSelection);
        onSelectionChange(updatedSelection, "bitcoin");
    };

    const handleRandomSelect = () => {
        const randomNumbers = Array.from({ length: 25 }, (_, i) => i + 1)
            .sort(() => Math.random() - 0.5)
            .slice(0, 14);
        setSelectedBitcoin(randomNumbers);
        onSelectionChange(randomNumbers, "bitcoin");
    };

    const clearSelection = () => {
        setSelectedBitcoin([]);
        onSelectionChange([], "bitcoin");
    };

    const renderButtons = () => {
        return Array.from({ length: 25 }, (_, index) => {
            const id = index + 1;
            const isSelected = selectedBitcoin.includes(id);

            return (
                <button
                    key={`bitcoin-${id}`}
                    className={`btn ${isSelected ? "btn-success" : "btn-primary"} shadow`}
                    style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                        fontSize: "18px",
                        color: "white",
                        margin: "5px",
                    }}
                    onClick={() => handleSelect(id)}
                >
                    {id}
                </button>
            );
        });
    };

    return (
        <div className="text-center">
            <h1>Selecciona tus numeros</h1>
            <div
                className="d-flex flex-wrap justify-content-center"
                style={{ maxWidth: "320px", margin: "auto" }}
            >
                {renderButtons()}
            </div>
            <button
                className="btn btn-warning mt-3"
                onClick={handleRandomSelect}
                disabled={selectedBitcoin.length === 14}
            >
                Selección Aleatoria
            </button>
            <button
                className="btn btn-danger mt-3 mx-2"
                onClick={clearSelection}
                disabled={selectedBitcoin.length === 0}
            >
                Borrar Selección
            </button>
            <button
                className="btn btn-success mt-3 mx-2"
                disabled={selectedBitcoin.length !== 14}
            >
                Confirmar Selección
            </button>
        </div>
    );
};

export default Bitcoin;
