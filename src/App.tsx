import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Services from "./pages/Services.tsx";
import Artisans from "./pages/Artisans.tsx";
import {LanguageProvider} from "./context/LanguageContext.tsx";
import CreateService from "./pages/CreateService.tsx";
import RequestService from "./pages/RequestService.tsx";

function App() {
    return (
        <LanguageProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/artisans" element={<Artisans />} />
                    <Route path="/create-service" element={<CreateService />} />
                    <Route path="/request-service" element={<RequestService />} />
                </Routes>
            </Router>
        </LanguageProvider>
    );
}

export default App;