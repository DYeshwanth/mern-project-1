import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./../Styles/ReadItems.css";
import Layout from "../Components/Layout";
import "./../../node_modules/bootstrap-icons/font/bootstrap-icons.min.css";
import "./../../node_modules/bootstrap/dist/css/bootstrap.min.css";

const ReadItems = () => {
  const { id } = useParams();
  const userid = window.localStorage.getItem("id");
  const [items, setItems] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    const getItems = () => {
      axios
        .get("http://localhost:8090/card/items-by-id/" + id)
        .then((result) => {
          setItems(result.data);
        })
        .catch((err) => console.log(err));
    };
    const fetchSavedItems = () => {
      axios
        .get("http://localhost:8090/card/saved-Items/" + userid)
        .then((result) => {
          setSavedItems(result.data.savedItems);
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
    fetchSavedItems();
    fetchCartItems();
    getItems();
  }, [id, userid]);
  const savedItem = (itemsid) => {
    axios
      .put("http://localhost:8090/card/saved", { userid, itemsid })
      .then((result) => {
        setSavedItems(result.data.savedItems);
        console.log("sucess");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };



  const isitemSaved = (id) => savedItems.includes(id);

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
      {/* <div>
        <img src={items.imageUrl}></img>
            <h3>{items.title}</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
              maxime dolores architecto!
            </p>
            <h6>{items.price}</h6>
            <button>Buy Now</button>
            <button  onClick={() => savedItem(items._id)}>{isitemSaved(items._id) ? "wishlisted" : "add to wishlist"}</button>
        </div> */}

      <div className="sub-product">
        <div className="body">
          <div className="container">
            <div className="product-card">
              <div className="cloth-bg">
                <h1 className="brand">T I N</h1>
                <img
                  src="https://i.postimg.cc/9F043kdH/TIN-logo.png"
                  alt=""
                  className="logo"
                ></img>
                <button
                  onClick={() => savedItem(items._id)}
                  disabled={isitemSaved(items._id)}
                  className="wishlist"
                >
                  {isitemSaved(items._id) ? (
                    <i class="bi bi-heart-fill red"></i>
                  ) : (
                    <i class="bi bi-heart-fill"></i>
                  )}
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
                  {/* <a href="#" className="buy">
                    <i className="bi bi-cart3"></i>Add to Cart
                  </a> */}
                  <button className="buy" onClick={() => cartItem(items._id)}>
                    {iscart(items._id) ? (
                      <div>
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
    </Layout>
  );
};

export default ReadItems;
