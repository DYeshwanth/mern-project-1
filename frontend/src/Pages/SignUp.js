import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../Components/Layout";
import "./../Styles/Login.css";

const SignUp = () => {
  const [FirstName, setFirstName] = useState();
  const [LastName, setLastName] = useState();
  const [Email, setEmail] = useState();
  const [Password, setPassword] = useState();
  const navigate = useNavigate();

  const HandelSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8090/SignUp", {
        FirstName,
        LastName,
        Email,
        Password,
      })
      .then((result) => {
        console.log(result);
        if (result.data.status === "ok") {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <Layout>
      {/* <div className="card">
        <h>SignUp</h>
        <br />
        <form onSubmit={HandelSubmit}>
          <table>
            <tbody>
              <tr>
                <td> First Name </td>
                <td>
                  <input
                    type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td> Last Name </td>
                <td>
                  <input
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td> Email ID </td>
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
              <tr>
                <button type="submit">Submit</button>
              </tr>
            </tbody>
          </table>
        </form>
        <p>
          Have an account ? <Link to="/Login">Login</Link>
        </p>
      </div> */}

      <div className="User-login">
        <div className="card">
          <h1>LOGIN</h1>
          <br />
          <form onSubmit={HandelSubmit}>
            <table>
              <tbody>
                <tr>
                  <td> First Name </td>
                  <td>
                    <input
                      type="text"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td> Last Name </td>
                  <td>
                    <input
                      type="text"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </td>
                </tr>
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
          Have an account ? {" "}
            <Link to="/Login" className="link">
              Login
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default SignUp;
