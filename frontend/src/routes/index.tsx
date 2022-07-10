import { Routes, Route } from "react-router-dom";
import Login from "../components/auth/login";
import FourOhFour from "../components/404";
import AuthRoutes from "./authRoutes";
import SignUp from "../components/auth/signup";
import { User } from "../redux/models";
import Tasks from "../components/tasks";
import NewTask from "../components/tasks/new";
import Profile from "../components/tasks/profile";
import Task from "../components/tasks/task";

function Router({ user }: { user: User | undefined }) {
  return (
    <Routes>
      <Route path="/login" element={<Login user={user} />} />
      <Route path="/signup" element={<SignUp user={user} />} />
      <Route path="*" element={<FourOhFour />} />
      <Route element={<AuthRoutes user={user} />}>
        <Route path="/" element={<Tasks />}>
          <Route path="/new" element={<NewTask />} />
          <Route path="/:id" element={<Task />} />
          <Route path="/" element={<Profile user={user} />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default Router;
