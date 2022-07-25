import { Outlet } from 'react-router-dom';
import Menu from "./components/Menu/Menu";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./features/userSlice";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Login from './routes/Login';
import { useDispatch } from 'react-redux';
import {doc, getDoc} from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import {db} from './firebase';
import { login } from './features/userSlice';

const getUserData = async (db, user) => {
  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);
  return userSnap;
}

export default function Layout(){
  const currentUser = useSelector(selectCurrentUser);
  const [user, loading, error] = useAuthState(auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if(loading){
    return(
      <><p>Loading</p></>
    )
  }

  if(error){
    return(
      <><p>There's an error</p></>
    )
  }

   //Current user gets unset on refresh. This code makes sure that we still have the full user object
  if(user && !currentUser){ //If the authentication object is set but our current user state is not we need to reload the data
    getUserData(db, user).then((userSnap) => {
      if(userSnap.exists()){
        dispatch(
          login({
            uid: user.uid,
            email: user.email,
            name: userSnap.data().name,
            permissions: userSnap.data().permissions,
            roles: userSnap.data().roles,
          })
        )
      }
    })
    return(
      <>
        <Outlet />
      </>
    )
  }

  if(!user){
    return(
      <><Login /></>
    )
  }
}