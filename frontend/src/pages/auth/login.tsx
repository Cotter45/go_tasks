import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";

import './auth.css';

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(login({email, password}));
    navigate('/');
  }

  return (
    <main className="main">
      <form onSubmit={handleSubmit} className="login-form">
        <label className="form-label" htmlFor="email">
          Email
        <input
          className="form-input"
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          />
        </label>
        <label className="form-label" htmlFor="password">
          Password
        <input
          className="form-input"
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          />
        </label>
        <button type="submit" className="form-button">Login</button>
        <Link to="/signup" className="link">
          Sign Up
        </Link>
      </form>
    </main>
  )
}

export default Login;