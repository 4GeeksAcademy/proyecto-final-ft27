import React from "react";

export const Instructions = () => {
    return (
        <div className="container mt-5">
            <div className="text-center">
                <h1 className="mb-5 text-primary fw-bold">Reglas del Juego</h1>
                <div className="card shadow-lg mx-auto" style={{ maxWidth: "700px" }}>
                    <div className="card-body">
                        <h3 className="mb-4 text-secondary border-bottom pb-2">Objetivo del Juego:</h3>
                        <p className="lead">
                            El objetivo es seleccionar exactamente <strong className="text-success">14 números</strong> en los juegos de <em>"Reto Ultra Millonario"</em> o <em>"Carrera del Dinero".</em>
                            Solo podrás confirmar tu selección cuando hayas elegido los 14 números en cada tablero.
                        </p>

                        <h3 className="mt-5 mb-4 text-secondary border-bottom pb-2">Cómo Jugar:</h3>
                        <ol className="list-group list-group-numbered">
                            <li className="list-group-item">
                                Selecciona los números que deseas en cada tablero. Puedes elegir un máximo de <strong>14 números</strong> por tablero.
                            </li>
                            <li className="list-group-item">
                                Si no sabes qué números escoger, utiliza el botón de <strong className="text-warning">Selección Aleatoria</strong> para que el sistema elija 14 números al azar por ti.
                            </li>
                            <li className="list-group-item">
                                Si te equivocas, haz clic en el botón <strong className="text-danger">Borrar Selección</strong> para reiniciar tus elecciones y comenzar de nuevo.
                            </li>
                            <li className="list-group-item">
                                Una vez que tengas tus 14 números seleccionados en ambos tableros, haz clic en <strong className="text-success">Confirmar Selección</strong> para validar tu jugada.
                            </li>
                        </ol>

                        <h3 className="mt-5 mb-4 text-secondary border-bottom pb-2">Nota Importante:</h3>
                        <p className="alert alert-warning lead">
                            Este es un juego de lotería, y está prohibido para <strong className="text-danger">menores de 18 años</strong>.
                            Al participar, confirmas que eres mayor de edad y que entiendes los términos y condiciones del juego.
                        </p>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default Instructions;
