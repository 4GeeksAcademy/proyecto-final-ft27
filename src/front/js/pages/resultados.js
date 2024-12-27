import React from "react";
import { Link } from "react-router-dom";

export const Results = () => {
    const playerNumbers = [3, 5, 8, 10, 12, 15, 17, 18, 19, 21, 22, 23, 24, 25]; 
    const winningNumbers = [5, 10, 15, 17, 19, 21, 23, 25, 1, 2, 4, 6, 9, 11]; 
    const prize = "5,000 USD"; 

    const calculateMatches = (player, winning) =>
        player.filter((number) => winning.includes(number));

    const matchedNumbers = calculateMatches(playerNumbers, winningNumbers);
    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4 text-primary">Resultados del Jugador</h2>
            <p className="text-center text-muted mb-5">
                Aquí están tus resultados del último sorteo.
            </p>

            <div className="row">
                <div className="col-md-6">
                    <div className="card shadow-sm mb-4">
                        <div className="card-header bg-primary text-white text-center">
                            <h5 className="card-title">Tus Números Seleccionados</h5>
                        </div>
                        <div className="card-body text-center">
                            <p className="card-text">
                                {playerNumbers.map((num, index) => (
                                    <span
                                        key={index}
                                        className="badge bg-secondary m-1 p-2 fs-6"
                                    >
                                        {num}
                                    </span>
                                ))}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card shadow-sm mb-4">
                        <div className="card-header bg-success text-white text-center">
                            <h5 className="card-title">Números Ganadores</h5>
                        </div>
                        <div className="card-body text-center">
                            <p className="card-text">
                                {winningNumbers.map((num, index) => (
                                    <span
                                        key={index}
                                        className="badge bg-success m-1 p-2 fs-6"
                                    >
                                        {num}
                                    </span>
                                ))}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card shadow-sm mb-4">
                <div className="card-header bg-warning text-white text-center">
                    <h5 className="card-title">Resultados</h5>
                </div>
                <div className="card-body text-center">
                    <p className="card-text">
                        Coincidencias:{" "}
                        {matchedNumbers.length > 0 ? (
                            matchedNumbers.map((num, index) => (
                                <span
                                    key={index}
                                    className="badge bg-info m-1 p-2 fs-6"
                                >
                                    {num}
                                </span>
                            ))
                        ) : (
                            <span className="text-danger">Ninguna</span>
                        )}
                    </p>
                    {matchedNumbers.length > 0 ? (
                        <p className="fs-5 text-success">
                            ¡Felicidades! Has ganado <strong>{prize}</strong>.
                        </p>
                    ) : (
                        <p className="fs-5 text-danger">Lo sentimos, no ganaste esta vez.</p>
                    )}
                </div>
            </div>
            <div className="text-center mt-4 mb-4">
                <Link to="/" className="btn btn-primary btn-lg shadow-lg">VOLVER</Link>
            </div>
        </div>
    );
};