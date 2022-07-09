import { useAppSelector } from "../redux/hooks";
import { Outlet, useNavigate } from "react-router-dom";

function AuthRoutes() {
  const navigate = useNavigate();
  const user = useAppSelector(state => state.auth.user);

  if (!user) navigate('/login');
  return (
    <>
      <Outlet />
    </>
  );
}

export default AuthRoutes;