import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import Home from './Home.jsx'
import StillLife from './StillLife.jsx'
import Admin from './Admin.jsx'
import Login from './Login.jsx';
import PrivateRoutes from './PrivateRoutes.jsx';
import { AuthProvider } from './AuthProvider.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      {" "}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/still" element={<StillLife stillLife="still" />}></Route>
        <Route path="/life" element={<StillLife stillLife="life" />}></Route>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoutes />}>
          {" "}
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </AuthProvider>
  </BrowserRouter>
)
