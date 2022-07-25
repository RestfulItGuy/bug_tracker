import {Outlet} from 'react-router-dom';

export default function Admin(){
  return(
    <>
      <h1>Admin</h1>
      <Outlet />
    </>
  )
}