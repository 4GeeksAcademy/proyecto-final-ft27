import React from "react";
import { Link } from "react-router-dom";

export const Faq = () => {
    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Preguntas Frecuentes</h2>
            <div className="accordion" id="faqAccordion">
                {faqData.map((item, index) => (
                    <div className="accordion-item" key={index}>
                        <h2 className="accordion-header">
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#collapse${index}`}
                                aria-expanded="false"
                                aria-controls={`collapse${index}`}
                            >
                                {item.question}
                            </button>
                        </h2>
                        <div
                            id={`collapse${index}`}
                            className="accordion-collapse collapse"
                            data-bs-parent="#faqAccordion"
                        >
                            <div className="accordion-body">
                                {item.answer}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-center mt-4 mb-4">
                <Link to="/" className="btn btn-primary">VOLVER</Link>
            </div>
        </div>
    );
};

const faqData = [
    {
        question: "1. ¿Cómo puedo comprar un boleto de lotería?",
        answer: "Puedes comprar un boleto de lotería en puntos de venta autorizados, como tiendas de conveniencia o en línea, dependiendo de la lotería específica. Asegúrate de seguir las instrucciones para seleccionar tus números o comprar un boleto con números generados al azar."
    },
    {
        question: "2. ¿Qué hago si pierdo mi boleto?",
        answer: "Un boleto de lotería perdido no puede ser reemplazado ni reclamado, ya que es la única prueba válida para reclamar un premio. Guarda tu boleto en un lugar seguro hasta el sorteo."
    },
    {
        question: "3. ¿Cómo sé si gané?",
        answer: "Puedes verificar los números ganadores en el sitio web oficial de la lotería, en aplicaciones móviles, en los puntos de venta autorizados, o viendo la transmisión en vivo del sorteo. Compara tus números con los ganadores para confirmar."
    },
    {
        question: "4. ¿Qué debo hacer si gano un premio?",
        answer: "Si tu premio es pequeño, generalmente puedes cobrarlo en el lugar donde compraste el boleto. Para premios más grandes, debes acudir a las oficinas de la lotería correspondiente y presentar tu boleto junto con una identificación oficial."
    },
    {
        question: "5. ¿Los premios tienen fecha de caducidad?",
        answer: "Sí, la mayoría de las loterías tienen un período límite para reclamar los premios, que puede variar entre 30 días y un año. Consulta las reglas específicas de la lotería que jugaste."
    },
    {
        question: "6. ¿Tengo que pagar impuestos sobre mis ganancias?",
        answer: "En muchos países, los premios de lotería están sujetos a impuestos. Es posible que se deduzca un porcentaje antes de que recibas tu premio, o que debas declarar las ganancias en tu declaración fiscal."
    },
    {
        question: "7. ¿Puedo jugar en loterías de otros países?",
        answer: "En algunos casos, puedes participar en loterías internacionales si compras un boleto en línea a través de distribuidores autorizados. Verifica las leyes de tu país antes de hacerlo."
    },
    {
        question: "8. ¿Qué pasa si varias personas tienen el boleto ganador?",
        answer: "Si varias personas tienen un boleto con los números ganadores, el premio se divide equitativamente entre ellas."
    },
    {
        question: "9. ¿Es seguro jugar en línea?",
        answer: "Jugar en línea es seguro siempre y cuando utilices el sitio web oficial de la lotería o un distribuidor autorizado. Revisa la autenticidad del sitio antes de comprar boletos."
    },
    {
        question: "10. ¿Puedo aumentar mis probabilidades de ganar?",
        answer: "Las probabilidades de ganar están determinadas por las reglas del juego y son iguales para todos los participantes. Comprar más boletos puede aumentar tus oportunidades, pero no garantiza ganar."
    }
];