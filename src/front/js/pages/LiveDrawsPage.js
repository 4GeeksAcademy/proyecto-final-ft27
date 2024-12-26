import React from "react";

const LiveDrawsPage = () => {
    const liveDraws = [
        {
            title: "Reto ultra Millonario",
            prize: "1,000,000 USD",
            time: "En vivo ahora",
            image: "https://cdn.pixabay.com/photo/2011/02/15/14/18/gambling-machine-4926_960_720.jpg",
        },
        {
            title: "Carrera del Dinero",
            prize: "250,000 USD",
            time: "Faltan 10 minutos",
            image: "https://tribunadeloscabos.s3-us-west-2.amazonaws.com/uploads/2020/05/casino2.jpg",
        },
    ];

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4 text-primary">Sorteos en Vivo</h1>
            <p className="text-center text-muted mb-5">
                ¡No te pierdas la acción! Únete ahora a los sorteos que están en vivo.
            </p>
            <div className="row g-4">
                {liveDraws.map((draw, index) => (
                    <div className="col-md-6" key={index}>
                        <div className="card shadow-sm">
                            <img
                                src={draw.image}
                                alt={`Imagen del sorteo ${draw.title}`}
                                className="card-img-top"
                            />
                            <div className="card-body text-center">
                                <h5 className="card-title">{draw.title}</h5>
                                <p className="card-text text-success fw-bold">{draw.prize}</p>
                                <p className="card-text text-danger fw-bold">{draw.time}</p>
                                <button className="btn btn-primary">Unirse Ahora</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LiveDrawsPage;
