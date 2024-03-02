import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout'
import axios from "axios";
import "./../../node_modules/bootstrap-icons/font/bootstrap-icons.min.css";
import "../Styles/Home.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./../../node_modules/bootstrap/dist/css/bootstrap.min.css";

const AddtoCart = () => {
//     const[cartItems, setCartItems] = useState([])
//     const {id } = useParams()
//     const userid = window.localStorage.getItem("id")
//     const navigate = useNavigate()
//   useEffect(() => {
//     axios.get('http://localhost:8090/card/user-cart-Items/'+userid)
//     .then(items => {
//       setCartItems(items.data)
//     }).catch(err => console.log(err))
//   }, [userid])
//   const RemoveCartItem = async (id, userid) => {
//     try {
//       await axios.delete(`http://localhost:8090/card/user-remove-cart-item/${id}/${userid}`);
  
//       // Update the local state to remove the item from the UI
//       setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
//         navigate('/')
//       alert("Removed from cart successfully");
//     } catch (error) {
//       console.error('Error removing item from wishlist:', error);
//     }
//   };
const [cartItems, setCartItems] = useState([]);
  const { id } = useParams();
  const userid = window.localStorage.getItem('id');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8090/card/user-cart-Items/${userid}`)
      .then((items) => {
        setCartItems(items.data);
      })
      .catch((err) => console.log(err));
  }, [userid]);

  const RemoveCartItem = async (id, userid) => {
    try {
      await axios.delete(`http://localhost:8090/card/user-remove-cart-item/${id}/${userid}`);

      // Update the local state to remove the item from the UI
      setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
      navigate('/');
      alert('Removed from cart successfully');
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
    }
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    const totalPrice = cartItems.reduce((total, item) => {
      // Remove commas from the price string and convert to number
      const itemPrice = parseFloat(item.price.replace(/,/g, ''));
  
      // Log the converted price for debugging
      console.log(`Item ID ${item._id} - Converted Price: ${itemPrice}`);
  
      return total + itemPrice;
    }, 0);
  
    // Return the total price
    return totalPrice.toFixed(2); // Optional: Format the total to fixed decimal places
    
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat( { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(price);
  };

  return (
    <Layout>
      {cartItems.map((items) => (
        <div key={items._id}>
          <div className="t-card">
            <Link
              to={`/read-items/${items._id}`}
              className="text-decoration-none"
            >
              <div className="card mb-3" style={{ "max-width": "540px" }}>
                <div className="row g-0">
                  <div className="col-md-4 product-img">
                    <img
                      src={items.imageUrl}
                      className="img-fluid rounded-start"
                      alt="..."
                      style={{ height: "30vh", width: "100%" }}
                    ></img>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{items.title}</h5>
                      <p className="card-text desc">
                        This is a wider card with supporting text below as a
                        natural lead-in to additional content. This content is a
                        little bit longer.
                      </p>
                      <p className="card-text price">
                        <i className="bi bi-currency-rupee"></i>
                        <span className="text-body-secondary">
                          {formatPrice(items.price)}
                        </span>
                      </p>
                      <button onClick={() => RemoveCartItem(items._id , userid)}>delete</button>
                    </div>
                  </div>
                </div>
                <div className="rating">
                  <i class="bi bi-star-fill"></i>
                  <span>{items.ratings}</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      ))}
      <h4>Total Price: {calculateTotalPrice()}</h4>
    </Layout>
  )
}

export default AddtoCart
