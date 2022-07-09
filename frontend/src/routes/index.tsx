import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/login";
import FourOhFour from "../pages/404";
import AuthRoutes from "./authRoutes";
import SignUp from "../pages/auth/signup";

function Router() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<FourOhFour />} />
      <Route element={<AuthRoutes />}>
        <Route path="/" element={<div className="main">Logged in</div>} />
      </Route>
    </Routes>
  );
}

export default Router;
