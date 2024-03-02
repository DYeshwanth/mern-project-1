import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { userContext } from '../App'

const HeaderAdmin = () => {
  const user = useContext(userContext)
  const navigate = useNavigate()

  // const handleLogout = () => {
  //   axios.get('http://localhost:8090/Logout')
  //   .then(res =>{
  //     if(res.data === "Success"){
  //       navigate(0)
  //     }
      
  //   } ) 
  //   .catch(err => console.log(err))
  // }
  const handleLogout = () => {
    window.localStorage.clear()
    axios.get('http://localhost:8090/Logout')
    .then(result => {
      navigate('/')
      window.location.reload()
      
    }).catch(err => console.log(err))
  }
  return (
    // <div>
    //     <Link to='/Create'> <button><h1>Create</h1></button> </Link>
    //   {
    //     user.Email ? 
    //     <div>
    //       <button onClick={handleLogout}>Logout</button>
    //     </div>
    //     :
    //     <div>
    //       <Link to="/login">
    //       <button className='btn'>Login</button>
    //       </Link>
    //     </div>
    //   }
    // </div>

  <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid navigation">
        <Link class="navbar-brand tin" to="/Admin">
          {" "}
          <img
            src="https://i.postimg.cc/9F043kdH/TIN-logo.png"
            alt=""
            className="logo"
          ></img>{" "}
        </Link>
        {/* <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button> */}
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <Link class="nav-link active" aria-current="page" to="/Admin">
              Home
            </Link>
            <Link class="nav-link" to="/Create">
              Create
            </Link>
            {user.Email ? (
              <div>
                <button class="nav-link" onClick={handleLogout}>Logout</button>
              </div>
            ) : (
              <div>
                <Link className="text-decoration-none" to="/login">
                  <button class="nav-link">Login</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>


  )
}

export default HeaderAdmin
