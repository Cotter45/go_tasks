import { useState } from "react";
import { login } from "../../redux/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";

import './login.css';

function Login() {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login({email, password}));
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
      </form>
    </main>
  )
}

export default Login;