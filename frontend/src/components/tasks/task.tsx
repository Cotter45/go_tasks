import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { updateTask } from "../../redux/taskSlice";

function Task() {
  const state = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const locationState: any = state.state;
  const task = locationState.task;

  const handleUpdate = async () => {
    const newTask = { ...task, completed: true };
    await dispatch(updateTask(newTask));
    navigate("/");
  }

  return (
    <div className="task">
      <div className="login-form">
        <div className="task-header">
          <h1 style={{ fontSize: "2rem" }}>{task.title}</h1>
          <div style={{ display: 'flex', gap: '10px' }}>
            <i title="Edit" className="icon fa-solid fa-pen"></i>
            <i title="Delete" className="icon fa-solid fa-trash-can"></i>
          </div>
        </div>

        <p>{task.description}</p>
        <button onClick={handleUpdate} className="form-button">
          Complete
        </button>
      </div>
    </div>
  );
}

export default Task;