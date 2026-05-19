import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import ScanPage from "./pages/ScanPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import PosterFormPage from "./pages/PosterFormPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/scan" element={<ScanPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/posters/new" element={<PosterFormPage />} />
      <Route path="/admin/posters/:id/edit" element={<PosterFormPage />} />
    </Routes>
  );
}

export default App;