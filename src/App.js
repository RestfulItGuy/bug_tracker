import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import {doc, getDoc} from 'firebase/firestore';

import {PrivateRoute, PublicRoute} from "./components/AuthRoute/PrivateRoute";
import { selectCurrentUser, login } from "./features/userSlice";
import { auth, db } from "./firebase";

import Dashboard from './routes/Dashboard';
import Create from "./routes/bugs/Create";
import Menu from "./components/Menu/Menu";
import Login from "./routes/Login";
import Admin from './routes/Admin';

import { useEffect } from "react";
import NotFound from "./routes/NotFound";

const getUserData = async (db, user) => {
  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);
  return userSnap;
}

export default function App(){
  const currentUser = useSelector(selectCurrentUser);
  const [user, loading, error] = useAuthState(auth);

  const dispatch = useDispatch();

  //State is cleared on refresh. Here we check if the firebase auth is still set (user is not logged out)
  //and then re-add the important data to the state
  useEffect(() => {
    if(user){ 
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
    }
  }, [dispatch, user, loading])

  if(loading){
    return <p>Loading</p>
  }

  if(error){
    return console.log(error)
  }

  return(
    <>
      <BrowserRouter>
        {currentUser ? <Menu /> : <></>}
        <Routes>
          <Route element={<PrivateRoute isAllowed={!!currentUser} redirectTo='/login' />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
          <Route element={<PublicRoute isAllowed={!!currentUser} />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}