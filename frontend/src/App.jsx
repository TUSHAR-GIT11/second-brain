import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { useAuth } from "./context/AuthContext";
import Knowledge from "./pages/Knowledge";
import Chat from "./pages/Chat";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <Routes>
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />

  <Route
    path="/"
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    }
  />

  <Route
    path="/knowledge"
    element={
      <ProtectedRoute>
        <Knowledge />
      </ProtectedRoute>
    }
  />

  <Route
    path="/chat"
    element={
      <ProtectedRoute>
        <Chat />
      </ProtectedRoute>
    }
  />

  <Route
    path="*"
    element={<Navigate to="/login" replace />}
  />
</Routes>
  );
};

export default App;