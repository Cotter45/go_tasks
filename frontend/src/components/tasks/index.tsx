import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getTasks } from "../../redux/taskSlice";
import Loading from "../loading/loading";
import TaskList from "./taskList";
import TaskMenu from "./taskMenu";

import './tasks.css';

function Tasks() {
  const dispatch = useAppDispatch();

  const [loaded, setLoaded] = useState(false);

  const user = useAppSelector(state => state.auth.user);
  const tasks = useAppSelector(state => state.tasks.tasks);
  const taskState = useAppSelector(state => state.tasks.status);

  useEffect(() => {
    if (loaded || !user) return;
    dispatch(getTasks(user.id));
    setLoaded(true);
  }, [dispatch, loaded, user]);

  return (
    <main className="main">
      <div className="task-page">
        {taskState === 'loading' && <Loading />}
        <TaskList tasks={tasks} />
        <div className="task-details">
          <TaskMenu />
          <Outlet />
        </div>
      </div>
    </main>
  );
}

export default Tasks;