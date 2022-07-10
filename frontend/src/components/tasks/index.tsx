import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getTasks } from "../../redux/taskSlice";
import TaskList from "./taskList";
import TaskMenu from "./taskMenu";

import './tasks.css';

function Tasks() {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const [activeTask, setActiveTask] = useState<number | undefined>(id ? +id : undefined);
  const [loaded, setLoaded] = useState(false);

  const user = useAppSelector(state => state.auth.user);
  const tasks = useAppSelector(state => state.tasks.tasks);

  useEffect(() => {
    if (loaded || !user) return;
    dispatch(getTasks(user.id));
    setLoaded(true);
  }, [dispatch, loaded, user]);

  useEffect(() => {
    setActiveTask(id ? +id : undefined);
  }, [id])

  return (
    <main className="main">
      <div className="task-page">
        <TaskList tasks={tasks} />
        <div className="task-details">
          <TaskMenu activeTask={activeTask} />
          <Outlet />
        </div>
      </div>
    </main>
  );
}

export default Tasks;