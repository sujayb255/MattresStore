import { useContext } from "react";
import logoImg from "../assets/logo.jpg";
import Buttons from "./UI/Buttons";
import CartContext from "./Store/CartContext.jsx";
import UserProgressContext from "./Store/UserProgressContext.jsx";
import "./Header.css"

export default function Header({ isAdmin, userData, onLogout, setCurrentPage }) {
  const crtCntxt = useContext(CartContext);

  const cartValue = crtCntxt.items.reduce((totalItems, item) => {
    return totalItems + item.quantity;
  }, 0);

  const userProgressCtx = useContext(UserProgressContext);

  function handleShowCart() {
    userProgressCtx.showCart();
  }

  return (
    <header id="main-header" className="header">
      {/* Left section with logo and title */}
      <div id="title" className="header-title">
        <img src={logoImg} alt="Store Logo" />
        <h1 className="header-link" onClick={() => setCurrentPage("food")}>Mattress Paradise</h1>
      </div>

      {/* Right section with navigation links and user info */}
      <nav className="header-nav">
        {/* Navigation links */}
        <div className="header-links">
          {/* <span className="header-link" onClick={() => setCurrentPage("food")}>FOOD</span>
          <span className="header-link" onClick={() => setCurrentPage("beverages")}>BEVERAGES</span>
          <span className="header-link" onClick={() => setCurrentPage("grocery")}>GROCERY</span>
          <span className="header-link" onClick={() => setCurrentPage("dairy")}>DAIRY</span>
          <span className="header-link" onClick={() => setCurrentPage("snacks")}>SNACKS</span>
          <span className="header-link" onClick={() => setCurrentPage("gas")}>GAS</span> */}
          {userData.isAdmin && (
            <span className="header-link strong-link" onClick={() => setCurrentPage("all-orders")}>ORDERS</span>
          )}
          {userData.isAdmin && (
            <span className="header-link strong-link" onClick={() => setCurrentPage("all-users")}>USERS</span>
          )}
        </div>

        {/* Cart button (not visible for admins) */}
        {!isAdmin && (
          <Buttons onClick={handleShowCart}>Cart ({cartValue})</Buttons>
        )}

        {/* User info and logout */}
        <div className="header-user">
          <span>{userData.userEmail}</span>
          <button className="logout-button" onClick={onLogout}>
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
}
