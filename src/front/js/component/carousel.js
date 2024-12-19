import React from "react";

export const Carousel = () => {
    return (
        <div className="container mt-5">
            <div id="imageCarousel" className="carousel slide" data-bs-ride="carousel">
                
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#imageCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#imageCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                </div>

                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="https://www.loteria.cl/absolutebm/banners/bannerhome_sinpozonavidad.gif" className="d-block w-100" alt="Banner 1" />
                    </div>
                    <div className="carousel-item">
                        <img src="https://www.loteria.cl/absolutebm/banners/banners%202023/esta-semana-banner_mega_navidad2.gif" className="d-block w-100" alt="Banner 2" />
                    </div>
                </div>

                <button className="carousel-control-prev" type="button" data-bs-target="#imageCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Anterior</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#imageCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Siguiente</span>
                </button>
            </div>
        </div>
    )
}