import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AdminHome from '../Admin-Home/AdminHome'

const EditItems = () => {
    const [title , setTitle] = useState('')
    const [ratings , setRatings] = useState('')
    const [price , setPrice] = useState('')
    const [category , setCategory] = useState('')
    const [imageUrl , setImageUrl] = useState('')
    let obj = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        let id = obj.id;
        axios.get('http://localhost:8090/card/update-item/' + id)
        .then((res) => {
            setTitle(res.data.title)
            setRatings(res.data.ratings)
            setPrice(res.data.price)
            setCategory(res.data.category)
            setImageUrl(res.data.imageUrl)
        })
    }, [obj.id])

    const handleSubmit = () => {
        let id = obj.id;
        let obj2 = {title , ratings , price , category , imageUrl}
        axios.put('http://localhost:8090/card/update-item/' + id , obj2)
        .then((res) => {
            
            if(res.status === 200){ 
                alert("Employee updated successfully")
                
              } else {
                Promise.reject();
              }
        }) .catch((err) => {
            console.log(err);
          })
    }

  return (
    <AdminHome>
    {/* <div>
      <h1>Edit the details of product</h1>
      <div>
      <form onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td>Title</td>
                <td><input type='text' name='title' defaultValue={title} onChange={(e) => {
                    setTitle(e.target.value);
                  }} /></td>
              </tr>
              <tr>
                <td>Ratings</td>
                <td><input type='text' name='ratings' defaultValue={ratings} onChange={(e) => {
                    setRatings(e.target.value);
                  }}  /></td>
              </tr>
              <tr>
                <td>Price</td>
                <td><input type='text' name='price' defaultValue={price} onChange={(e) => {
                    setPrice(e.target.value);
                  }} /></td>
              </tr>
              <tr>
                <td>Category</td>
                <td><input type='text' name='category' defaultValue={category} onChange={(e) => {
                    setCategory(e.target.value);
                  }} /></td>
              </tr>
              <tr>
                <td>Image URL</td>
                <td><input type='text' name='imageUrl' defaultValue={imageUrl}  onChange={(e) => {
                    setImageUrl(e.target.value);
                  }} /></td>
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
                <td><input type='text' name='title' defaultValue={title} onChange={(e) => {
                    setTitle(e.target.value);
                  }} /></td>
              </tr>
              <tr>
                <td>Ratings</td>
                <td><input type='text' name='ratings' defaultValue={ratings} onChange={(e) => {
                    setRatings(e.target.value);
                  }}  /></td>
              </tr>
              <tr>
                <td>Price</td>
                <td><input type='text' name='price' defaultValue={price} onChange={(e) => {
                    setPrice(e.target.value);
                  }} /></td>
              </tr>
              <tr>
                <td>Category</td>
                <td><input type='text' name='category' defaultValue={category} onChange={(e) => {
                    setCategory(e.target.value);
                  }} /></td>
              </tr>
              <tr>
                <td>Image URL</td>
                <td><input type='text' name='imageUrl' defaultValue={imageUrl}  onChange={(e) => {
                    setImageUrl(e.target.value);
                  }} /></td>
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


export default EditItems
