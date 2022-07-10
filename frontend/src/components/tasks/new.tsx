import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { createTask } from '../../redux/taskSlice';

function NewTask() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const user = useAppSelector(state => state.auth.user);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user || !title || !description) return;

    const task = {
      title,
      description,
      user_id: user.id,
      completed: false
    };

    await dispatch(createTask(task));
    setTitle('');
    setDescription('');
    navigate('/');
  }

  return (
    <div className="task">
      <form className="login-form" onSubmit={handleSubmit}>
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
    </div>
  );
}

export default NewTask;