import { Routes, Route } from "react-router-dom";
import Login from "../pages/login/login";
import FourOhFour from "../pages/404";

function Router() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<FourOhFour />} />
    </Routes>
  );
}

export default Router;
