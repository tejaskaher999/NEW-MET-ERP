import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole: 'student' | 'staff' | 'librarian';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRole }) => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const authToken = localStorage.getItem('authToken');
      const userRole = localStorage.getItem('userRole');

      if (!authToken || !userRole) {
        router.push('/login');
        return;
      }

      if (userRole !== allowedRole) {
        switch (userRole) {
          case 'student':
            router.push('/');
            break;
          case 'staff':
            router.push('/staff-dashboard');
            break;
          case 'librarian':
            router.push('/librarian-dashboard');
            break;
          default:
            router.push('/login');
        }
        return;
      }

      setIsAuthorized(true);
    };

    checkAuth();
  }, [allowedRole, router]);

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;