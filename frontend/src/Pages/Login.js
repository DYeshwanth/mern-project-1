import React, { useState } from 'react'
import Layout from "../Components/Layout"
import { Link} from 'react-router-dom'
import axios from 'axios'
import './../Styles/Login.css'

const Login = () => {
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState()

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8090/Login", {Email,Password})
    .then(result => {
      console.log(result) 
      if(result.data.status === 'Success'){
        if(result.data.role === 'admin'){
          window.localStorage.setItem("id", result.data.id )
          window.location.href = "/Admin"
        } else {
          window.localStorage.setItem("id", result.data.id )
          window.location.href = '/'
        }
      }
      
    })
    .catch(err => console.log(err))
  }

  return (
    <Layout>
      {/* <div className='card'>
        <h>Login Account</h>
        <br/>
        <form onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td>Email ID</td>
                <td><input type='email' onChange={(e) => setEmail(e.target.value)} /></td>
              </tr>
              <tr>
                <td>Password</td>
                <td><input type='password' onChange={(e) => setPassword(e.target.value)} /></td>
              </tr>
              <tr>
                <td>
                  <button type='submit'>Submit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
        <p>Don't have an account ? <Link to='/SignUp'>
          SignUp
        </Link> </p>

      </div> */}

      <div className="User-login">
      <div className="card">
        <h1>LOGIN</h1>
        <br />
        <form onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td>Email ID</td>
                <td>
                  <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>Password</td>
                <td>
                  <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </td>
              </tr>
              <td>
                <tr>
                  <button type="submit">Submit</button>
                </tr>
              </td>
            </tbody>
          </table>
        </form>
        <p>
          Don't have an account ? <Link to="/SignUp" className="link">SignUp</Link>
        </p>
      </div>
    </div>
    </Layout>
    
  )
}

export default Login




