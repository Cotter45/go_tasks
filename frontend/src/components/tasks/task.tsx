import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { deleteTask, updateTask } from "../../redux/taskSlice";

function Task() {
  const state = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const locationState: any = state.state;
  const task = locationState.task;

  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
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
    await dispatch(deleteTask(task));
    navigate("/");
  }

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

export default Task;