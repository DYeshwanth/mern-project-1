import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Home from './Pages/Home';
import SignUp from './Pages/SignUp';
import AdminHome from './Admin-Home/AdminHome';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import Create from './Pages/Create';
import ReadItems from './Pages/ReadItems';
import WhislistedItems from './Pages/WhislistedItems';
import AdminH from './Pages/AdminH';
import EditItems from './Pages/EditItems';
import AddtoCart from './Pages/AddtoCart';


export const userContext = createContext()

function App() {
  const [user,setUser] = useState({})

  useEffect(() => {
    
    axios.defaults.withCredentials = true;
    axios.get('http://localhost:8090/')
    .then(user => {
      console.log(user)
      setUser(user.data)
    }) 
    .catch(err => console.log(err))
  }, [])
  return (
    <userContext.Provider value={user}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<Home/>} />
        <Route path='/login' element= {<Login/>} />
        <Route path='/SignUp' element = {<SignUp/>} />
        <Route path='/Admin' element = {<AdminHome />} />
        <Route path='/Create' element = {<Create />} />
        <Route path='/read-items/:id' element = {<ReadItems />} />
        <Route path='/wishlisted' element={<WhislistedItems />} />
        <Route path='/Admin/' element={<AdminH />} />
        <Route path='/Edit-item/:id' element={<EditItems />} />
        <Route path='/Add-to-cart' element={<AddtoCart />} />
      </Routes>
    </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;
