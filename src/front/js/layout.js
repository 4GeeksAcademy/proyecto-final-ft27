import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Bitcoin } from "./pages/bitcoin";
import { Home } from "./pages/home";
import { Faq } from "./pages/faq";
import { Ley20393 } from "./pages/ley20393"; // Add this import
import injectContext from "./store/appContext";
import { Dollar } from "./pages/dollar";
import { Instructions } from "./pages/instructions";

import { Footer } from "./component/footer";
import { Navbar } from "./component/navbar";
import { Results } from "./pages/resultados";
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
                    <Routes>
                        <Route element={<LiveDrawsPage />} path="/live" />
                        <Route element={<WinnersPage />} path="/winners" />
                        <Route element={<Home />} path="/" />
                        <Route element={<Bitcoin />} path="/bitcoin" />
                        <Route element={<Dollar />} path="/dollar" />
                        <Route element={<Instructions />} path="/instructions" />
                        <Route element={<Results />} path="/results" />
                        <Route element={<Faq />} path="/faq" />
                        <Route element={<Ley20393 />} path="/ley20393" /> 
                        <Route path="*" element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);