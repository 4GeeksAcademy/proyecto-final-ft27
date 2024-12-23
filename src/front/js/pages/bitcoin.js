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
                    className={`btn btn-primary rounded-circle ${isSelected ? "btn-success shadow-lg" : "shadow-sm"} w-100`}
                    style={{ height: "60px", fontSize: "18px", fontWeight: "bold" }}
                    onClick={() => handleSelect(id)}
                >
                    {id}
                </button>
            );
        });
    };

    return (
        <div className="container text-center py-4">
            <h1 className="fw-bold mb-4" style={{ fontSize: "3rem" }}>
                Reto ultra Millonario
            </h1>
            <h1 className="fw-bold text-primary mb-4" style={{ fontSize: "2rem" }}>
                ¡Selecciona tus números de la suerte!
            </h1>
            <div className="d-grid gap-3" style={{ gridTemplateColumns: "repeat(5, 1fr)", maxWidth: "400px", margin: "0 auto" }}>
                {renderButtons()}
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
                    disabled={selectedBitcoin.length !== 14}
                >
                    Confirmar Selección
                </button>
            </div>
        </div>
    );
};

export default Bitcoin;
