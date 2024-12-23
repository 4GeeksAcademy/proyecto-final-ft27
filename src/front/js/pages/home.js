import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {
    const { store, actions } = useContext(Context);

    return (
        <>
            <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
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


            <div className="container mt-4 bg-light p-3 rounded">
                <div className="d-flex justify-content-between gap-3">
                    <div className="d-flex flex-column align-items-center">
                        <Link to="/bitcoin"
                            className="btn btn-primary btn-lg d-flex align-items-center justify-content-center shadow rounded-circle"
                            style={{ width: "80px", height: "80px" }}
                        >
                            <i className="fa-brands fa-bitcoin fa-2xl"></i>
                        </Link>
                        <span className="mt-2">Reto ultra Millonario</span>
                    </div>

                    <div className="d-flex flex-column align-items-center">
                        <Link to="/dollar"
                            className="btn btn-info btn-lg text-white d-flex align-items-center justify-content-center shadow rounded-circle"
                            style={{ width: "80px", height: "80px" }}
                        >
                            <i className="fa-solid fa-dollar-sign fa-2xl"></i>
                        </Link>
                        <span className="mt-2">Carrera del Dinero</span>
                    </div>

                    <div className="d-flex flex-column align-items-center">
                        <Link to="/instructions"
                            className="btn btn-warning btn-lg d-flex align-items-center justify-content-center shadow rounded-circle"
                            style={{ width: "80px", height: "80px" }}
                        >
                            <i className="fa-solid fa-question fa-2xl"></i>
                        </Link>
                        <span className="mt-2">Instrucciones</span>
                    </div>
                </div>
            </div>


            <div className="container">
                <div className="row mt-4">
                    <div className="col-12 mb-3">
                        <Link to="/results" className="btn btn-primary w-100">
                            Resultados
                        </Link>
                    </div>
                    <div className="col-lg-6">
                        <Link to="/faq" className="btn btn-primary w-100">
                            Preguntas frecuentes
                        </Link>
                    </div>
                    <div className="col-lg-6">
                        <Link to="/ley20393" className="btn btn-primary w-100">
                            Ley 20.393
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};