import React from "react";

export const Games = () => {
    return (
        <div className="container mt-4 bg-light p-3 rounded">
            <div className="d-flex justify-content-between gap-3">
                <button className="btn btn-primary btn-lg d-flex align-items-center justify-content-center shadow rounded-circle" style={{ width: "80px", height: "80px" }}>
                    <i className="fa-brands fa-bitcoin fa-2xl"></i>
                </button>

                <button className="btn btn-info btn-lg text-white d-flex align-items-center justify-content-center shadow rounded-circle" style={{ width: "80px", height: "80px" }}>
                    <i className="fa-solid fa-dollar-sign fa-2xl"></i>
                </button>

                <button className="btn btn-warning btn-lg d-flex align-items-center justify-content-center shadow rounded-circle" style={{ width: "80px", height: "80px" }}>
                    <i className="fa-solid fa-question fa-2xl"></i>
                </button>
            </div>
        </div>
    )
}