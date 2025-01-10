import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import Admin from './Admin.jsx'
import Login from './Login.jsx';
import PrivateRoutes from './PrivateRoutes.jsx';
import { AuthProvider } from './AuthProvider.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      {" "}
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoutes />}>
          {" "}
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </AuthProvider>
  </BrowserRouter>
)
