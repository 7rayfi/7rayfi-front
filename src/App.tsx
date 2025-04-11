import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Services from "./pages/Services.tsx";
import Artisans from "./pages/Artisans.tsx";
import {LanguageProvider} from "./context/LanguageContext.tsx";

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
                </Routes>
            </Router>
        </LanguageProvider>
    );
}

export default App;