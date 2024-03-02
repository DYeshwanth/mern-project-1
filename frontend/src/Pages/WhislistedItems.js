import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import axios from "axios";
import "./../../node_modules/bootstrap-icons/font/bootstrap-icons.min.css";
import "../Styles/Items.css";
import "./../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Link, useParams } from "react-router-dom";

const WhislistedItems = () => {
  const [saveditems, setSaveditems] = useState([]);
  const { id } = useParams();
  const userid = window.localStorage.getItem("id");
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8090/card/user-saved-Items/" + userid)
      .then((items) => {
        setSaveditems(items.data);
      })
      .catch((err) => console.log(err));
  }, [userid]);
  const RemoveItem = async (id, userid) => {
    try {
      await axios.delete(
        `http://localhost:8090/card/user-remove-item/${id}/${userid}`
      );

      // Update the local state to remove the item from the UI
      setSaveditems((prevItems) => prevItems.filter((item) => item._id !== id));

      alert("Removed from wishlist successfully");
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
    }
  };

  useEffect(() => {
    const getItems = () => {
      axios
        .get("http://localhost:8090/card/items-by-id/" + id)
        .then((result) => {
          setItems(result.data);
        })
        .catch((err) => console.log(err));
    };
    const fetchCartItems = () => {
      axios
        .get("http://localhost:8090/card/cart-Items/" + userid)
        .then((result) => {
          setCartItems(result.data.cartItems);
        })
        .catch((err) => console.log(err));
    };
    fetchCartItems();
    getItems();
  }, [id, userid]);

  const cartItem = (itemsid) => {
    axios
      .put("http://localhost:8090/card/cart", { userid, itemsid })
      .then((result) => {
        setCartItems(result.data.cartItems);
        console.log("sucess");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const iscart = (id) => cartItems.includes(id);
  const formatPrice = (price) => {
    return new Intl.NumberFormat( { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(price);
  };

  return (
    <Layout>
      <h1>Saved Items</h1>

      {/* {
            saveditems.map(items => (
              <div className='Home-content'>
      <div className="gallery">
        <div  className="content">
              <div key={items._id} className='item'>
                <img src={items.imageUrl} className='item-image'></img>
                <h3 className='item-title'>{items.title}</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
                  maxime dolores architecto!
                </p>
                <h6>{items.price}</h6>
                <button>Buy Now</button>
                <button onClick={() => RemoveItem(items._id , userid)}>Remove</button>
              </div>
              </div>
      </div>
      </div>
            ))
          } */}

      {saveditems.map((items) => (
        <div className="sub-product">
          <div className="body">
            <div className="container">
              <div key={items._id} className="product-card">
                <div className="cloth-bg">
                  <h1 className="brand">T I N</h1>
                  <img
                    src="https://i.postimg.cc/9F043kdH/TIN-logo.png"
                    alt=""
                    className="logo"
                  ></img>
                  {/* <button onClick={() => savedItem(items._id)} disabled={isitemSaved(items._id)} className="wishlist">{isitemSaved(items._id) ? <i class="bi bi-heart-fill red"></i> : <i class="bi bi-heart-fill"></i>}
                  
                </button> */}
                  <button
                    className="remove"
                    onClick={() => RemoveItem(items._id, userid)}
                  >
                    <i class="bi bi-x-circle "></i>
                  </button>

                  <img src={items.imageUrl} alt="" className="cloth-img"></img>
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
                    <button className="buy" onClick={() => cartItem(items._id)}>
                      {iscart(items._id) ? (
                        <div>
                          {" "}
                          <Link
                            to="/Add-to-cart"
                            className="text-decoration-none"
                          >
                            <i className="bi bi-cart3"></i>go to Cart
                          </Link>
                        </div>
                      ) : (
                        <div>
                          {" "}
                          <i className="bi bi-cart3"></i> add to Cart
                        </div>
                      )}
                    </button>
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
      ))}
    </Layout>
  );
};

export default WhislistedItems;
