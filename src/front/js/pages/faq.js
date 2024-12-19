import React from "react";
import { Link } from "react-router-dom";

export const Faq = () => {
    return (
        <div className="container text-center mt-5">
            <h2>What is your question?</h2>
            {/* Add your FAQ content here */}
            <Link to="/" className="btn btn-primary mt-4">VOLVER</Link>
        </div>
    );
};