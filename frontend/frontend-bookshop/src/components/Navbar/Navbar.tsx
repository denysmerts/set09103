import { ReactComponent as SVG } from "../../assets/svgs/logo.svg";
import { ReactComponent as Basket } from "../../assets/svgs/basket.svg";
import { NavLink } from "react-router-dom";
import "./Navbar.scss";

export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar_intro">
        <div className="navbar_logo">
          <SVG />
        </div>
        <div className="navbar_title">
          Cozy <br /> Bookpoint
        </div>
      </div>

      <div className="navbar_links">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/shop"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Shop
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          About
        </NavLink>
        <NavLink
          to="/basket"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          <Basket />
        </NavLink>
      </div>
    </div>
  );
};

