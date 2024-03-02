import React, { useEffect, useState } from "react";
import { Dropdown } from 'react-bootstrap';
import Layout from "../Components/Layout";
import axios from "axios";
import "./../../node_modules/bootstrap-icons/font/bootstrap-icons.min.css";
import "../Styles/Home.css";
import { Link } from "react-router-dom";
// import "./../../node_modules/bootstrap/dist/css/bootstrap.min.css";



const Home = () => {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [selectedKeyword, setSelectedKeyword] = useState("all");

  useEffect(() => {
    axios
      .get("http://localhost:8090/card/items")
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleKeywordChange = (keyword) => {
    if (keyword === "All items") {
      window.location.reload();
    } else {
      setSelectedKeyword(keyword);
    }
  };

  const handlePriceRangeChange = (priceRange) => {
    setSelectedPriceRange(priceRange);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat( { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(price);
  };

  const sortItemsByPrice = (items) => {
    return items.sort((a, b) => parseInt(a.price) - parseInt(b.price));
  };

  const filterItems = () => {
    let filteredItems = items;

    if (selectedCategory !== "all") {
      filteredItems = filteredItems.filter(item => item.category === selectedCategory);
    }

    if (selectedPriceRange !== "all") {
      const [minPrice, maxPrice] = selectedPriceRange.split('-');
      filteredItems = filteredItems.filter(item => item.price >= parseInt(minPrice) && item.price <= parseInt(maxPrice));
    }

    if (selectedKeyword !== "all") {
      const keywords = selectedKeyword.toLowerCase().trim().split(' ');
      filteredItems = filteredItems.filter(item => {
        const titleWords = item.title.toLowerCase().split(' ');
        return keywords.every(keyword => titleWords.includes(keyword));
      });
    }

    return sortItemsByPrice(filteredItems);
  };

  const filteredItems = filterItems();
  return (
    <Layout>
      {/* {
            items.map(items => (
              <div className='Home-content'>
      <div className="gallery">
        <div  className="content">
              <div key={items._id} className='item'>
                <Link to={`/read-items/${items._id}`} className='text-decoration-none'>
                <img src={items.imageUrl} className='item-image'></img>
                <h3 className='item-title'>{items.title}</h3>
                <p>
                  Lorem ipsum dolor sit amet 
                </p>
                <h6>{items.price}</h6>
                </Link>
              </div>
              </div>
      </div>
      </div>
            ))
          } */}


{/* <div className="category-filter">
        <button onClick={() => handleCategoryChange("all")}>All</button>
        <button onClick={() => handleCategoryChange("Shirt")}>Shirts</button>
        <button onClick={() => handleCategoryChange("Jeans")}>Jeans</button>
        <button onClick={() => handleCategoryChange("Saree")}>Sarees</button>
      </div>

      <div className="price-filter">
        <button onClick={() => handlePriceRangeChange("all")}>All Prices</button>
        <button onClick={() => handlePriceRangeChange("0-1500")}>0 - 100</button>
        
      </div>

      <div className="keyword-filter">
        <button onClick={() => handleKeywordChange("all")}>All</button>
        <button onClick={() => handleKeywordChange("men")}>Men</button>
        <button onClick={() => handleKeywordChange("women")}>Women</button>
      </div> */}
      
<div className="dropdownItems">
  <div ><button class="btn btn-secondary" onClick={() => handleKeywordChange("All items")}>All items</button></div>
<Dropdown>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        Men
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleKeywordChange("men")}>All</Dropdown.Item>
        <Dropdown.Item onClick={() => handleCategoryChange("Shirt")}>Shirts</Dropdown.Item>
        <Dropdown.Item onClick={() => handleCategoryChange("Jeans")}>Jeans</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

    <Dropdown>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        Women
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleKeywordChange("women")}>All</Dropdown.Item>
        <Dropdown.Item onClick={() => handleCategoryChange("Saree")}>Sarees</Dropdown.Item>
        <Dropdown.Item onClick={() => handleCategoryChange("Jeans")}>Jeans</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </div>




      {filteredItems.map((items) => (
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
    </Layout>
  );
};

export default Home;
