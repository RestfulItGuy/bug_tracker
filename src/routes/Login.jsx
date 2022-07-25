import { signInWithEmailAndPassword } from "firebase/auth";
import {doc, getDoc} from 'firebase/firestore';
import { db } from "../firebase";
import {login} from '../features/userSlice'
import { useState } from "react";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Login(){
  let [username, setUsername] = useState("asdf@asdf.com");
  let [password, setPassword] = useState("asdfasdf");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, username, password)
    .then(async(userAuth) => {
      const userRef = doc(db, "users", userAuth.user.uid);
      const userSnap = await getDoc(userRef);
      if(userSnap.exists()){
        dispatch(
          login({
            uid: userAuth.user.uid,
            email: userAuth.user.email,
            name: userSnap.data().name,
            permissions: userSnap.data().permissions,
            roles: userSnap.data().roles
          })
        )
      }
    })
    .then(() => {
      navigate('/')
    })
  }



  return(
    <>
      <h1>Login to Bugtracker</h1>
      <form>
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Your username" required />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder="Your password" required />
        <button onClick={handleLogin}>Login</button>
      </form>
    </>
  )
}