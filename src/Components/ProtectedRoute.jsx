import { Navigate } from 'react-router-dom';

function ProtectedRoute({ element: Component, isAuthenticated }) {
  return isAuthenticated ? <Component /> : <Navigate to="/Login" />;
}

export default ProtectedRoute;

//Component represents the component you want to protect.
//isAuthenticated: This boolean prop determines if the user is logged in.
//The ternary operator checks if isAuthenticated is true. 
//If so, the Component is rendered. Otherwise, the user is redirected to the /Login page using Navigate.