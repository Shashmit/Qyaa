import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AuthLayout from "./layout/AuthLayout";

//routes
import Login from "./pages/Login";
import Register from "./pages/Register";
import AppLayout from "./layout/AppLayout";
import User from "./pages/User";

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
          <Route index element={<User />} />
          <Route path="user" element={<User />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
