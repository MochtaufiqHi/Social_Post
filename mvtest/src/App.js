import './App.css';
import { Route, Routes} from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home'
import User from './pages/User'
import Password from './pages/Password'
import Post from './pages/Post'
import {API, setAuthToken} from './config/API/api'
import { useContext } from 'react';
import { UserContext } from './context/UserContext';

if(localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {

  const [state, dispatch] = useContext(UserContext);

  // const [state, dispatch] = useContext(UserContext)
  // console.log(state);
  return (
    <Routes>
      <Route exact path='/login' element={<Login />} />
      <Route exact path='/register' element={<Register />} />
      <Route exact path='/' element={<Home />} />
      <Route exact path='/user' element={<User />} />
      <Route exact path='/change-pass' element={<Password />} />
      <Route exact path='/post' element={<Post />} />
    </Routes>
  );
}

export default App;
