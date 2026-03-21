import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import GeneroPage from "./components/Genero/GeneroPage";
import DirectorPage from "./components/Director/DirectorPage";
import ProductoraPage from "./components/Productora/ProductoraPage";
import TipoPage from "./components/Tipo/TipoPage";
import MediaPage from "./components/Media/MediaPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/generos" element={<GeneroPage />} />
        <Route path="/directores" element={<DirectorPage />} />
        <Route path="/productoras" element={<ProductoraPage />} />
        <Route path="/tipos" element={<TipoPage />} />
        <Route path="/media" element={<MediaPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;

