import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { Task } from "../../redux/models";
import { deleteTask, updateTask } from "../../redux/taskSlice";

function CurrentTask() {
  const state = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const locationState: any = state.state;
  const stateTask = locationState.task;

  const [task, setTask] = useState<Task>();
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!task) return;
    const newTask = { 
      ...task,
      title: edit ? title : task.title,
      description: edit ? description : task.description,
      completed: !edit
  };
    await dispatch(updateTask(newTask));
    setEdit(false);
    !edit && navigate('/');
  }

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!task) return;
    await dispatch(deleteTask(task));
    navigate("/");
  }

  useEffect(() => {
    if (!stateTask) return;
    setTask(stateTask);
    setTitle(stateTask.title);
    setDescription(stateTask.description);
  }, [stateTask]);

  if (!task) return null;
  return (
    <div className="task">
      <div className="login-form">
        <div className="task-header">
          <h3>{title}</h3>
          <div style={{ display: 'flex', gap: '10px' }}>
            <i onClick={() => setEdit(!edit)} title="Edit" className="icon fa-solid fa-pen"></i>
            <i onClick={handleDelete} title="Delete" className="icon fa-solid fa-trash-can"></i>
          </div>
        </div>

        {!edit && (
          <>
            <p>{description}</p>
            <button type="button" onClick={handleUpdate} className="form-button">
              Complete
            </button>
          </>
        )}

        {edit && (
          <form className="login-form" onSubmit={handleUpdate}>
            <label className="form-label" htmlFor="title">
              Title
              <input
                type="text"
                name="title"
                placeholder="Title"
                className="form-input"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label 
              className="form-label" htmlFor="description"
            >
              Description
              <textarea
                name="description"
                placeholder="Description"
                className="form-input"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <button 
              className="form-button" type="submit"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default CurrentTask;