import { useDispatch, useSelector } from 'react-redux';
import { logout, fetchUser } from '../features/auth/authSlice';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, status, error, isAuthenticated } = useSelector((state) => state.auth);
  const [authChecked, setAuthChecked] = useState(false);
  console.log('Auth state:', { isAuthenticated, user, status });
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      
      if (!user) {
        dispatch(fetchUser())
          .unwrap()
          .catch(() => {
            localStorage.removeItem('token');
            navigate('/login');
          })
          .finally(() => setAuthChecked(true));
      } else {
        setAuthChecked(true);
      }
    } else {
      // No token - redirect to login
      navigate('/login');
      setAuthChecked(true);
    }
  }, [dispatch, navigate, user]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  if (!authChecked || status === 'loading') {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
          Todo App
        </Link>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-gray-700">
                Hello, {user.name || user.email || 'User'}
              </span>
              <button
                onClick={handleLogout}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="text-blue-600 hover:text-blue-800">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
    <main className="container mx-auto px-4 py-8">
      <Outlet />
    </main>
  </div>
  );
};

export default Layout;