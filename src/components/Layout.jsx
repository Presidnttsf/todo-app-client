import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, status, error, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated && status !== 'loading') {
      navigate('/login');
    }
  }, [isAuthenticated, status, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };



  return (
    <div className="min-h-screen bg-gray-50">
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
          Todo App
        </Link>
        <div className="flex items-center space-x-4">
          {status === 'loading' ? (
            <span>Loading...</span>
          ) : error ? (
            <span className="text-red-500">Error: {error}</span>
          ) : user ? (
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