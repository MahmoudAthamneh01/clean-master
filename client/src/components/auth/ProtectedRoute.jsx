import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      try {
        // Decode token to check user data
        const payload = JSON.parse(atob(token.split('.')[1]));
        
        // Mock user data based on token
        if (payload.id === 'admin123' && payload.role === 'admin') {
          setUser({
            id: 'admin123',
            role: 'admin',
            name: 'كلين ماستر - الإدارة'
          });
        } else {
          // For real users, you would make an API call here
          setUser({ role: 'user' });
        }
      } catch (error) {
        localStorage.removeItem('token');
        setUser(null);
      }
    }
    
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute; 