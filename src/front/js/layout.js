import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { ProtectedRoute } from "./component/ProtectedRoute";
import { LoginRequiredModal } from "./component/LoginRequiredModal";

import { Bitcoin } from "./pages/bitcoin";
import { Home } from "./pages/home";
import { Faq } from "./pages/faq";
import { Ley20393 } from "./pages/ley20393"; 
import injectContext from "./store/appContext";
import { Dollar } from "./pages/dollar";
import { Instructions } from "./pages/instructions";
import { NotFound } from "./pages/NotFound"
import { Register } from "./pages/Register";

import { Footer } from "./component/footer";
import { Navbar } from "./component/navbar";
import { Tickets } from "./pages/tickets";
import WinnersPage from "./pages/WinnersPage";
import LiveDrawsPage from "./pages/LiveDrawsPage";

const Layout = () => {
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <LoginRequiredModal />
                    <Routes>
                        <Route element={<LiveDrawsPage />} path="/live" />
                        <Route element={<Register />} path="/register" />
                        <Route element={<WinnersPage />} path="/winners" />
                        <Route element={<Home />} path="/" />
                        <Route 
                            path="/bitcoin" 
                            element={
                                <ProtectedRoute>
                                    <Bitcoin />
                                </ProtectedRoute>
                            } 
                        />
                        <Route 
                            path="/dollar" 
                            element={
                                <ProtectedRoute>
                                    <Dollar />
                                </ProtectedRoute>
                            } 
                        />
                        <Route element={<Instructions />} path="/instructions" />
                        <Route 
                            path="/tickets" 
                            element={
                                <ProtectedRoute>
                                    <Tickets />
                                </ProtectedRoute>
                            } 
                        />
                        <Route element={<Faq />} path="/faq" />
                        <Route element={<Ley20393 />} path="/ley20393" /> 
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);