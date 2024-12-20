import React, { useState } from "react";

export const Dollar = ({ onSelectionChange }) => {
    const [selectedDollar, setSelectedDollar] = useState([]);

    const handleSelect = (id) => {
        const updatedSelection = selectedDollar.includes(id)
            ? selectedDollar.filter((item) => item !== id)
            : selectedDollar.length < 14
                ? [...selectedDollar, id]
                : selectedDollar;

        setSelectedDollar(updatedSelection);
        onSelectionChange(updatedSelection, "dollar");
    };

    const handleRandomSelect = () => {
        const randomNumbers = Array.from({ length: 25 }, (_, i) => i + 1)
            .sort(() => Math.random() - 0.5)
            .slice(0, 14);
        setSelectedDollar(randomNumbers);
        onSelectionChange(randomNumbers, "dollar");
    };

    const clearSelection = () => {
        setSelectedDollar([]);
        onSelectionChange([], "dollar");
    };

    const renderButtons = () => {
        return Array.from({ length: 25 }, (_, index) => {
            const id = index + 1;
            const isSelected = selectedDollar.includes(id);

            return (
                <button
                    key={`dollar-${id}`}
                    className={`btn ${isSelected ? "btn-success" : "btn-info"} shadow`}
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
                disabled={selectedDollar.length === 14}
            >
                Selección Aleatoria
            </button>
            <button
                className="btn btn-danger mt-3 mx-2"
                onClick={clearSelection}
                disabled={selectedDollar.length === 0}
            >
                Borrar Selección
            </button>
            <button
                className="btn btn-success mt-3 mx-2"
                disabled={selectedDollar.length !== 14}
            >
                Confirmar Selección
            </button>
        </div>
    );
};

export default Dollar;
