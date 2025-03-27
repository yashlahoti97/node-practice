import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

class NavBar extends Component {
  state = {};
  render() {
    const { user } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          Vidly
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav w-100">
            <NavLink className="nav-item nav-link" to="/movies">
              Movies <span className="sr-only">(current)</span>
            </NavLink>
            <NavLink className="nav-item nav-link" to="/customers">
              Customers
            </NavLink>
            <NavLink className="nav-item nav-link" to="/rentals">
              Rentals
            </NavLink>
            <div className="w-100" >
              {!user && (
                <div className="row flex flex-row justify-content-end mr-2">
                  <NavLink className="nav-item nav-link" to="/login">
                    <button className="btn btn-primary py-1 px-2">Login</button>
                  </NavLink>
                  <NavLink className="nav-item nav-link" to="/register">
                  <button className="btn btn-success py-1 px-2">Register</button>
                  </NavLink>
                </div>
              )}
              {user && (
                <div className="row flex flex-row justify-content-end mr-2">
                  <NavLink className="nav-item nav-link" to="/profile">
                    <button className="btn btn-light py-1 px-2">{user.name}</button>
                  </NavLink>
                  <NavLink className="nav-item nav-link" to="/logout">
                    <button className="btn btn-danger py-1 px-2">logout</button>
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
