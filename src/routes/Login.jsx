import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react"
import { auth } from "../firebase";

export default function Login(){
  let [username, setUsername] = useState("asdf@asdf.com");
  let [password, setPassword] = useState("asdfasdf");

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, username, password).then(alert("Logged in")).then(console.log(auth.currentUser));
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