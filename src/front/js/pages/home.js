import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container">
            <h1 className="text-center mt-5">ProyectoFinal</h1>
            
            <div className="row mt-4">
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
    );
};