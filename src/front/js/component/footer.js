import React from 'react';

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-6 col-md-2 text-center">
                        <i className="fas fa-certificate" style={{ fontSize: '50px', margin: '10px 0' }}></i>
                        <p>World Lottery Asocciation Certified</p>
                    </div>
                    <div className="col-6 col-md-2 text-center">
                        <i className="fas fa-user-graduate" style={{ fontSize: '50px', margin: '10px 0' }}></i>
                        <p>Para mayores de 18+</p>
                    </div>
                    <div className="col-6 col-md-2 text-center">
                        <i className="fas fa-user-check" style={{ fontSize: '50px', margin: '10px 0' }}></i>
                        <p>Juega Responsable 18+</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};
