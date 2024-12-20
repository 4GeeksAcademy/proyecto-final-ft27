import React from "react";

export const Instructions = () => {
    return (
        <div className="container mt-5">
            <div className="text-center">
                <h1 className="mb-4 text-primary">Reglas del Juego</h1>
                <div className="text-start mx-auto" style={{ maxWidth: "700px" }}>
                    <h3 className="mb-3 text-secondary">Objetivo del Juego:</h3>
                    <p className="lead">
                        El objetivo es seleccionar exactamente <strong className="text-success">14 números</strong> en los juegos de "Reto ultra Millonario" o "Carrera del Dinero"
                        Solo podrás confirmar tu selección cuando hayas elegido los 14 números en cada tablero.
                    </p>

                    <h3 className="mb-3 text-secondary">Cómo Jugar:</h3>
                    <ol className="list-decimal list-inside">
                        <li>
                            Selecciona los números que deseas en cada tablero. Puedes elegir un máximo de <strong>14 números</strong> por tablero.
                        </li>
                        <li>
                            Si no sabes que numeros escoger, puedes usar el botón de <strong className="text-primary">Selección Aleatoria</strong> para que el sistema elija 14 números al azar por ti.
                        </li>
                        <li>
                            Si te equivocas, utiliza el botón <strong className="text-danger">Borrar Selección</strong> para reiniciar tus elecciones y comenzar de nuevo.
                        </li>
                        <li>
                            Una vez que tengas tus 14 números seleccionados en ambos tableros, haz clic en <strong className="text-success">Confirmar Selección</strong> para validar tu jugada.
                        </li>
                    </ol>

                    <h3 className="mb-3 text-secondary">Nota Importante:</h3>
                    <p className="lead">
                        Este es un juego de lotería, y por tanto, está prohibido para <strong className="text-danger">menores de 18 años</strong>.
                        Al participar, confirmas que eres mayor de edad y que entiendes los términos y condiciones del juego.
                    </p>
                </div>
            </div>
        </div>

    );
};

export default Instructions;
