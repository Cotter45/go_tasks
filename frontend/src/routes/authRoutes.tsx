import { useAppSelector } from "../redux/hooks";
import { Outlet, Navigate } from "react-router-dom";

function AuthRoutes() {
  const user = useAppSelector(state => state.auth.user);

  return (
    <>
      <Outlet />
      {!user && <Navigate to="/login" />}
    </>
  );
}

export default AuthRoutes;