import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AuthLayout from "./layout/AuthLayout";

//routes
import Login from "./pages/Login";
import Register from "./pages/Register";
import AppLayout from "./layout/AppLayout";
import Admin from "./pages/Admin";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Admin />} />
          <Route path="admin" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
