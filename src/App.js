import { Routes, Route } from "react-router-dom";
import './App.css';
import Home from './views/Home';
import LogIn from "./views/Login/LogIn";
import DetailedCiv from "./views/Detailed/DetailedCiv";
import DetailedUnit from "./views/Detailed/DetailedUnit";
import Register from "./views/Login/Register";
import Favourites from "./views/Favourites";
import NoMatch from "./views/NoMatch";
import ProtectedRoute from "./components/ProtectedRoute";
import Civilizations from "./components/content/Civilizations/Civilizations";
import Units from "./components/content/Units/Units";
import Structures from "./components/content/Structures/Structures";
import Technologies from "./components/content/Technologies/Technologies";
import { AuthContextProvider } from "./context/AuthContext";
import { PaginationContextProvider } from "./context/PaginationContext";
import { FavouriteContextProvider } from "./context/FavouriteContext";
import DetailedTech from "./views/Detailed/DetailedTech";
import DetailedStruc from "./views/Detailed/DetailedStruc";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <FavouriteContextProvider>
        <PaginationContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/civilizations" element={<Civilizations />} />
            <Route path="/civilizations/civilization-:id" element={<DetailedCiv />} />
            <Route path="/units" element={<Units />} />
            <Route path="/units/unit-:id" element={<DetailedUnit />} />
            <Route path="/technologies" element={<Technologies />} />
            <Route path="/technologies/technology-:id" element={<DetailedTech />} />
            <Route path="/structures" element={<Structures />} />
            <Route path="/structures/structure-:id" element={<DetailedStruc />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/favourites/unit-:id" element={<ProtectedRoute><DetailedUnit /></ProtectedRoute>} />
            <Route path="/favourites/civilization-:id" element={<ProtectedRoute><DetailedCiv /></ProtectedRoute>} />
            <Route path="/favourites" element={<ProtectedRoute><Favourites /></ProtectedRoute>} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </PaginationContextProvider>
        </FavouriteContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
