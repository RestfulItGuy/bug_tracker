import {Link} from 'react-router-dom';

export default function Menu(){
  //We set user on successful login
  let user;
  return(
    user ?
    <nav>
      <ul>
        <Link to='/dashboard'>Dashboard</Link>
        <Link to='/admin'>Admin</Link>
        <button>Logout</button>
      </ul>
    </nav> 
    : <></>
  )
}