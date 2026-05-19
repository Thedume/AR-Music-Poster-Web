import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ScanPage from "./pages/ScanPage";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import PosterFormPage from "./pages/PosterFormPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/scan" element={<ScanPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/posters/new"
        element={
          <ProtectedRoute>
            <PosterFormPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/posters/:id/edit"
        element={
          <ProtectedRoute>
            <PosterFormPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;