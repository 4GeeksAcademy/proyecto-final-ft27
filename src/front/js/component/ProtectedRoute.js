import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Context } from "../store/appContext";

export const ProtectedRoute = ({ children }) => {
    const { store } = useContext(Context);
    const location = useLocation();

    if (!store.user) {
        const loginRequiredModal = new bootstrap.Modal(document.getElementById('loginRequiredModal'));
        loginRequiredModal.show();
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
};