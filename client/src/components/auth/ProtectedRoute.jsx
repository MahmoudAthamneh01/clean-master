import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('cleanmaster_token');
    const userData = localStorage.getItem('cleanmaster_user');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        console.log('✅ User loaded from localStorage:', parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('cleanmaster_token');
        localStorage.removeItem('cleanmaster_user');
        setUser(null);
      }
    } else {
      console.log('❌ No user data found in localStorage');
    }
    
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user) {
    console.log('🔄 Redirecting to login - no user');
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && user.role !== 'admin') {
    console.log('🚫 Access denied - not admin:', user.role);
    return <Navigate to="/" replace />;
  }

  console.log('✅ Access granted for user:', user.name, 'Role:', user.role);
  return children;
};

export default ProtectedRoute; 