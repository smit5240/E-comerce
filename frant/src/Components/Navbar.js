import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logoutbtn = () => {
    localStorage.removeItem("token");
  };
  const location = useLocation();
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark navbar-dark">
        <a className="navbar-brand " href="/">
          <img src="weblogo.png" className="logo_img" alt="" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {localStorage.getItem("token") ? (
              <li className="nav-item active">
                <Link
                  className={`nav-link ${
                    location.pathname === "/home" ? "active" : ""
                  }`}
                  to="/home"
                >
                  Home
                </Link>
              </li>
            ) : (
              ""
            )}
            {localStorage.getItem("token") ? (
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/order" ? "active" : ""
                  }`}
                  to="/order"
                >
                  Order
                </Link>
              </li>
            ) : (
              ""
            )}
            {localStorage.getItem("token") ? (
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/addproduct" ? "active" : ""
                  }`}
                  to="/addproduct"
                >
                  AddProduct
                </Link>
              </li>
            ) : (
              ""
            )}
            {localStorage.getItem("token") ? (
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/manage" ? "active" : ""
                  }`}
                  to="/manage"
                >
                  Manage
                </Link>
              </li>
            ) : (
              ""
            )}
            {!localStorage.getItem("token") ? (
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  to="/"
                >
                  Login
                </Link>
              </li>
            ) : (
              ""
            )}
            {localStorage.getItem("token") ? (
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/logout" ? "active" : ""
                  }`}
                  to="/"
                  onClick={() => logoutbtn()}
                >
                  {" "}
                  react toast vapar Logout
                </Link>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}
