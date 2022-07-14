import { Navigate, Outlet } from "react-router-dom";

export default function AuthRoute({isAllowed, redirectTo='/dashboard', children}){
  //In the router component we pass the conditions that allow a user to access the route
  if(!isAllowed){ return <Navigate to={redirectTo} replace /> }
  
  return <Outlet />
}