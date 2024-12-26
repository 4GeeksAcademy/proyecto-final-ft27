import React from "react";

const WinnersPage = () => {
    const winners = [
        {
            name: "María López",
            prize: "10,000 USD",
            image: "https://randomuser.me/api/portraits/women/1.jpg",
            location: "Madrid, España",
        },
        {
            name: "John Smith",
            prize: "50,000 USD",
            image: "https://randomuser.me/api/portraits/men/2.jpg",
            location: "New York, USA",
        },
        {
            name: "Sofía Martínez",
            prize: "5,000 USD",
            image: "https://randomuser.me/api/portraits/women/3.jpg",
            location: "Buenos Aires, Argentina",
        },
        {
            name: "Carlos Rivera",
            prize: "20,000 USD",
            image: "https://randomuser.me/api/portraits/men/4.jpg",
            location: "Ciudad de México, México",
        },
        {
            name: "Ana Gómez",
            prize: "15,000 USD",
            image: "https://randomuser.me/api/portraits/women/5.jpg",
            location: "Lima, Perú",
        },
        {
            name: "Daniel Oliveira",
            prize: "30,000 USD",
            image: "https://randomuser.me/api/portraits/men/6.jpg",
            location: "São Paulo, Brasil",
        },
    ];

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4 text-primary">Ganadores Recientes</h1>
            <p className="text-center text-muted mb-5">
                Conoce a los afortunados que han hecho realidad sus sueños.
            </p>
            <div className="row g-4">
                {winners.map((winner, index) => (
                    <div className="col-md-6 col-lg-4" key={index}>
                        <div className="card shadow-sm">
                            <img
                                src={winner.image}
                                alt={`Foto de ${winner.name}`}
                                className="card-img-top"
                            />
                            <div className="card-body text-center">
                                <h5 className="card-title">{winner.name}</h5>
                                <p className="card-text text-success fw-bold">{winner.prize}</p>
                                <p className="card-text text-muted">{winner.location}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WinnersPage;
