import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './../../node_modules/bootstrap-icons/font/bootstrap-icons.min.css'
import '../Styles/Items.css'
import { Link, useParams } from 'react-router-dom'
import './../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import AdminHome from '../Admin-Home/AdminHome'

const AdminH = () => {
    const {id} = useParams()
    const[items, setItems] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("all")
  useEffect(() => {
    axios.get('http://localhost:8090/card/items')
    .then(items => {
      setItems(items.data)
    }).catch(err => console.log(err))
  }, [])
  const deleteItem = (id) => {
    console.log(id)
    axios.delete('http://localhost:8090/card/delete-item/' + id)
    .then((result) => {
        if (result.status === 200) {
            alert("Employee delete successfully");
            window.location.reload();
          } else {
            Promise.reject();
          }
        })
        .catch((err) => {
          console.log(err);
    })
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    console.log(category)
  };

  const filteredItems = selectedCategory === "all"
    ? items
    : items.filter(item => item.category === selectedCategory)
    console.log('success');

    const formatPrice = (price) => {
      return new Intl.NumberFormat( { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(price);
    };


  return (
    <AdminHome>
      {/* {
            items.map(items => (
              <div className='Home-content'>
      <div className="gallery">
        <div  className="content">
              <div key={items._id} className='item'>
                <img src={items.imageUrl} className='item-image'></img>
                <h3 className='item-title'>{items.title}</h3>
                <p>
                  Lorem ipsum dolor sit amet 
                </p>
                <h6>{items.price}</h6>
                <button onClick={() => deleteItem(items._id)}>Delete</button>
                <Link to={`/Edit-item/${items._id}`}>
                    <button>Edit</button>
                </Link>
              </div>
              </div>
      </div>
      </div>
            ))
          } */}

<div className="category-filter">
        <button onClick={() => handleCategoryChange("all")}>All</button>
        <button onClick={() => handleCategoryChange("Shirt")}>Shirts</button>
        <button onClick={() => handleCategoryChange("Jeans")}>Jeans</button>
        {/* Add more category buttons as needed */}
      </div>
        
        {
  filteredItems.map(items => (
<div className="sub-product">
        <div className="body">
          <div className="container">
            <div key={items._id} className="product-card">
              <div  className="cloth-bg">
                <h1 className="brand">T I N</h1>
                <img
                  src="https://i.postimg.cc/9F043kdH/TIN-logo.png"
                  alt=""
                  className="logo"
                ></img>
                {/* <button onClick={() => savedItem(items._id)} disabled={isitemSaved(items._id)} className="wishlist">{isitemSaved(items._id) ? <i class="bi bi-heart-fill red"></i> : <i class="bi bi-heart-fill"></i>}
                  
                </button> */}
                <button className='remove' onClick={() => deleteItem(items._id)}><i class="bi bi-x-circle "></i></button>
                
                <img
                  src={items.imageUrl}
                  alt=""
                  className="cloth-img"
                ></img>
              </div>
              <div className="info">
                <div className="product-name">
                  <div>
                    <h1 className="big">{items.title}</h1>
                    <span className="new">new</span>
                  </div>
                  <h3 className="small">{items.category}</h3>
                </div>
                <div className="desc">
                  <h3 className="title">product info</h3>
                  <p className="text">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's.
                  </p>
                </div>
                <div className="size-contain">
                  <h3 className="title">size</h3>
                  <div className="sizes">
                    <span className="size">S</span>
                    <span className="size">M</span>
                    <span className="size active">L</span>
                    <span className="size">XL</span>
                    <span className="size">XXL</span>
                  </div>
                </div>
                <div className="buy-price">
                  {/* <a href="#" className="buy">
                    <i className="bi bi-cart3"></i>Add to Cart
                  </a> */}
                  <Link className='buy' to={`/Edit-item/${items._id}`}>
                  Edit an item
                </Link>
                  <div className="price">
                    <i className="bi bi-currency-rupee"></i>
                    <h1>{formatPrice(items.price)}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  ))
    }

    </AdminHome>
  )
}

export default AdminH
