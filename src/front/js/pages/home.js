import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {
    const { store, actions } = useContext(Context);

    return (
        <>
            <div id="carouselExample" className="carousel slide mb-4" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img
                            src="https://caracoltv.brightspotcdn.com/dims4/default/6797e37/2147483647/strip/true/crop/1280x720+0+0/resize/800x450!/quality/75/?url=http%3A%2F%2Fcaracol-brightspot.s3.us-west-2.amazonaws.com%2F89%2F34%2F4c37b7e04e58bf5019aed2638b6e%2Fballs-6077901-1280-1.jpg"
                            className="d-block w-100 carousel-img"
                            alt="Imagen 1"
                        />
                    </div>
                    <div className="carousel-item">
                        <img
                            src="https://www.loteriamanises.com/blog/wp-content/uploads/2017/10/paises-que-prohiben-los-juegos-de-azar.jpg"
                            className="d-block w-100 carousel-img"
                            alt="Imagen 2"
                        />
                    </div>
                </div>
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExample"
                    data-bs-slide="prev"
                >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExample"
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            <div className="container py-4 bg-white rounded shadow-sm">
                <h2 className="text-center mb-4">¡Explora y juega!</h2>
                <div className="d-flex justify-content-around flex-wrap">
                    <ActionCard
                        to="/bitcoin"
                        iconClass="fa-brands fa-bitcoin"
                        bgClass="btn-primary"
                        text="Reto Ultra Millonario"
                    />
                    <ActionCard
                        to="/dollar"
                        iconClass="fa-solid fa-dollar-sign"
                        bgClass="btn-info text-white"
                        text="Carrera del Dinero"
                    />
                    <ActionCard
                        to="/instructions"
                        iconClass="fa-solid fa-question"
                        bgClass="btn-warning"
                        text="Instrucciones"
                    />
                </div>
            </div>


            <div className="container mt-4">
                <div className="row g-3">
                    <div className="col-12">
                        <Link to="/tickets" className="btn btn-primary w-100 py-3 shadow-sm">
                            <i class="fa-solid fa-money-bill"></i> Pago Pendiente
                        </Link>
                    </div>
                    <div className="col-lg-6">
                        <Link to="/faq" className="btn btn-outline-primary w-100 py-3 shadow-sm">
                            <i className="fa-solid fa-circle-question me-2"></i>Preguntas Frecuentes
                        </Link>
                    </div>
                    <div className="col-lg-6">
                        <Link to="/ley20393" className="btn btn-outline-primary w-100 py-3 shadow-sm">
                            <i className="fa-solid fa-gavel me-2"></i>Ley 20.393
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

const ActionCard = ({ to, iconClass, bgClass, text }) => (
    <div className="text-center mb-3">
        <Link
            to={to}
            className={`btn ${bgClass} btn-lg d-flex align-items-center justify-content-center shadow rounded-circle`}
            style={{ width: "100px", height: "100px" }}
        >
            <i className={`${iconClass} fa-2xl`}></i>
        </Link>
        <span className="mt-2 d-block">{text}</span>
    </div>
);
