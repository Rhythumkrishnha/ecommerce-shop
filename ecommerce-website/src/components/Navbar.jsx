import React from "react";
import "./NavbarStyles.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userRedux";
import { deleteProduct } from "../redux/cartRedux";

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(logout());
    dispatch(deleteProduct());
  };
  return (
    <div className="container">
      <div className="wrapper">
        <div className="left">
          <span>EN</span>
          <div className="searchContainer">
            <input type="search" className="search-bar" placeholder="Search" />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
        <div className="center">
          <h1>KRISH.</h1>
        </div>
        <div className="right">
          {currentUser ? (
            <>
              <div className="menuItems">
                Welcome {currentUser.username.toUpperCase()}
              </div>
              <div className="menuItems logout" onClick={handleClick}>
                LOG OUT
              </div>
            </>
          ) : (
            <>
              <div className="menuItems">
                <Link className="nav-link" to="/register">
                  REGISTER
                </Link>
              </div>
              <div className="menuItems">
                <Link className="nav-link" to="/login">
                  SIGN IN
                </Link>
              </div>
            </>
          )}
          <div className="menuItems cart" quantity={quantity}>
            <Link className="nav-link" to="/cart">
              <i className="fa-solid fa-cart-shopping" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
