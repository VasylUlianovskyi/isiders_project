import { Navigate } from 'react-router-dom';

interface Props {
  isLoggedIn: boolean;
  children: React.ReactElement;
}

const ProtectedRoute = ({ isLoggedIn, children }: Props) => {
  if (!isLoggedIn) {
    return <Navigate to='/login' />;
  }
  return children;
};

export default ProtectedRoute;
