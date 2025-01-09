import React from "react";
import { Link } from "react-router-dom";
import "../../styles/ley.css";

export const Ley20393 = () => {
    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4 text-primary">Responsabilidad Penal de las Personas Jurídicas</h2>

            <div className="text-justify mb-4">
                <p>
                    Conforme a lo dispuesto en la Ley Nº 20.393 que establece la responsabilidad penal de las personas jurídicas para los delitos de: Lavado de Activos, Financiamiento del Terrorismo, Cohecho a funcionario público nacional y extranjero, Receptación, Administración Desleal, Negociación Incompatible, Apropiación Indebida, Corrupción entre Particulares, Contaminación de aguas, Comercialización de productos vedados, Pesca ilegal de recursos del fondo marino y Procesamiento, elaboración y almacenamiento de productos colapsados o sobreexplotados sin acreditar origen legal, Lotería de Concepción ha dispuesto para sus colaboradores, clientes y público en general los siguientes canales de denuncia, los que tienen como propósito el recibir información relevante respecto a cualquier hecho o situación irregular que tengan relación con los delitos antes descritos.
                </p>

                <p>
                    Las denuncias podrán ser anónimas y en caso contrario la información será tratada de manera confidencial.
                </p>

                <p>
                    Toda denuncia efectuada por este canal será recibida por el Encargado de Prevención de Delitos.
                </p>

                <h4 className="mt-4 mb-3 text-primary">¿Qué información debe contener la denuncia?</h4>
                <ul className="list-unstyled">
                    <li className="mb-2">• Indicar si desea efectuar la denuncia de forma anónima o en caso contrario identificarse.</li>
                    <li className="mb-2">• Indicar si es o no colaborador de Lotería.</li>
                    <li className="mb-2">• Identificar el área de Lotería involucrada.</li>
                    <li className="mb-2">• Señalar la infracción, el o los delitos al/los que se hace referencia en la denuncia.</li>
                    <li className="mb-2">• Identificar, opcionalmente, a la/las persona/s denunciada/s, señalando nombre, apellido, cargo y/o área.</li>
                    <li className="mb-2">• Aportar todos los detalles relacionados con la presunta denuncia que permitan al Encargado de Prevención de Delitos (EPD) y la administración disponer de mayores antecedentes que facilitarán la evaluación, resolución y determinación de acciones a seguir, tales como fecha, hora y lugar donde ocurrieron el o los hechos denunciados, descripción de los hechos, con indicación de las circunstancias en que ocurrieron, presuntas personas involucradas y forma en la cual el Denunciante tomó conocimiento de ellos.</li>
                    <li className="mb-2">• Si dispone de un documento o archivo que apoye la denuncia, se deberá adjuntar (por ejemplo: fotos, grabaciones de voz, videos, documentos, entre otros).</li>
                </ul>
            </div>

            <div className="text-center">
                <Link to="/" className="btn btn-primary btn-lg shadow-lg">
                    <i className="fas fa-home me-2"></i>
                    VOLVER
                </Link>
            </div>
        </div>
    );
};
