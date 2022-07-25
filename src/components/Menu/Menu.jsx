import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { auth } from '../../firebase';

import { logout } from '../../features/userSlice'; 

export default function Menu(){
  const dispatch = useDispatch();

  const handleLogout = () => {
    auth.signOut().then(() => {
      dispatch(logout());
    })
  }
  
  return(
    <nav>
      <ul>
        <Link to='/'>Dashboard</Link>
        <Link to='/admin'>Admin</Link>
        <button onClick={handleLogout}>Logout</button>
      </ul>
    </nav>
  )
}