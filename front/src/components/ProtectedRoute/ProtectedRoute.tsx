import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedProfiles: string[];
}

const ProtectedRoute = ({ children, allowedProfiles }: ProtectedRouteProps) => {
    const userProfile = localStorage.getItem('profile');

    if (!userProfile || !allowedProfiles.includes(userProfile)) { 
      return <Navigate to="/signin" />;
    }
    
  return (
    <>
      {children}
    </>
  )
}

export default ProtectedRoute
