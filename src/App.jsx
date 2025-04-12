import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { fetchUser } from './features/auth/authSlice';
import PrivateRoute from './features/auth/PrivateRoute';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import TaskList from './features/tasks/TaskList';
import Layout from './components/Layout';

function App() {
  const dispatch = useDispatch();
  
  const { isAuthenticated, status } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(fetchUser());
    }
  }, [dispatch]);

  if (status === 'loading') {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
<Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/" replace /> : <Register />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<TaskList />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;