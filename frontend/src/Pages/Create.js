import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminHome from '../Admin-Home/AdminHome'

const Create = () => {
    const [item, setItem] = useState({
        title : "",
        ratings : "",
        price : "",
        category : "",
        imageUrl : "",
        userId : window.localStorage.getItem("id")
    })

    const handleChange = (event) => {
        const {name, value} = event.target
        setItem({...item, [name]: value})
    }
    const navigate = useNavigate()
    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:8090/card/create-item', item)
        .then(result => {
            navigate('/admin')
            console.log(result.data);
            alert("new item is added")
        }).catch(err => console.log(err))
    }
  return (
    <AdminHome>
    {/* <div>
      <h1>Add the details of product</h1>
      <div>
      <form onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td>Title</td>
                <td><input type='text' name='title' onChange={handleChange} /></td>
              </tr>
              <tr>
                <td>Ratings</td>
                <td><input type='text' name='ratings' onChange={handleChange} /></td>
              </tr>
              <tr>
                <td>Price</td>
                <td><input type='text' name='price' onChange={handleChange} /></td>
              </tr>
              <tr>
                <td>Category</td>
                <td><input type='text' name='category' onChange={handleChange} /></td>
              </tr>
              <tr>
                <td>Image URL</td>
                <td><input type='text' name='imageUrl' onChange={handleChange} /></td>
              </tr>
              <tr>
                <td>
                  <button type='submit'>Submit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div> */}

    <div className="User-login">
      <div className="card">
        <h1>Add new products/Items</h1>
        <br />
        <form onSubmit={handleSubmit}>
          <table>
            <tbody>
            <tr>
                <td>Title</td>
                <td><input type='text' name='title' onChange={handleChange} /></td>
              </tr>
              <tr>
                <td>Ratings</td>
                <td><input type='text' name='ratings' onChange={handleChange} /></td>
              </tr>
              <tr>
                <td>Price</td>
                <td><input type='text' name='price' onChange={handleChange} /></td>
              </tr>
              <tr>
                <td>Category</td>
                <td><input type='text' name='category' onChange={handleChange} /></td>
              </tr>
              <tr>
                <td>Image URL</td>
                <td><input type='text' name='imageUrl' onChange={handleChange} /></td>
              </tr>
              <tr>
                <td>
                  <button type='submit'>Submit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>


    </AdminHome>
  )
}

export default Create
