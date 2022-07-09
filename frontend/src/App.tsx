import { useEffect } from 'react';
import Loading from './components/loading/loading';
import Nav from './components/nav';
import Login from './pages/login/login';
import { restore } from './redux/auth/authSlice';
import { authFetch } from './redux/authFetch';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import Router from './routes';

function App() {
  const dispatch = useAppDispatch();

  const user = useAppSelector(state => state.auth.user);
  const status = useAppSelector(state => state.auth.status);

  useEffect(() => {
    if (user) return;
    dispatch(restore());
  });

  return (
    <div className="main">
      <header className="header">
        <Nav />
      </header>
      {!user && status !== 'loading' && <Login />}
      {user && <Router />}
      {status === 'loading' && <Loading />}
    </div>
  );
}

export default App;
