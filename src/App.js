import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./Layout"
import Login from "./routes/Login"
import Dashboard from './routes/Dashboard'
import Admin from './routes/Admin'
import AuthRoute from "./components/AuthRoute/AuthRoute"
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./features/users/userSlice"

export default function App(){
  const currentUser = useSelector(selectCurrentUser);

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Login />} />
          <Route element={<AuthRoute isAllowed={!!currentUser} />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}