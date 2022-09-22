import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import AuthenticationService from "../AuthenticationService";

function BsNavBar({isLoggedIn,setIsUserLoggedIn}) {
  
  const history = useHistory();
  const logOut = () =>{
    AuthenticationService.removeUserDetails();
    setIsUserLoggedIn(false);
    history.push('/')
  }
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i class="fas fa-bars"></i>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <NavLink class="navbar-brand mt-2 mt-lg-0" to="#">
            <img
              src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
              height="15"
              alt="MDB Logo"
              loading="lazy"
            />
          </NavLink>
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <NavLink class="nav-link nav-link" to="/home">
                Home
              </NavLink>
            </li>
            <li class="nav-item">
              <NavLink class="nav-link nav-link" to="#">
                Team
              </NavLink>
            </li>
            <li class="nav-item">
              <NavLink class="nav-link nav-link" to="#">
                Projects
              </NavLink>
            </li>
          </ul>
        </div>

        <div class="d-flex align-items-center">
          {/* <NavLink class="text-reset me-3" to="#">
            <i class="fas fa-shopping-cart"></i>
          </NavLink>  */}

          {/* <div class="dropdown">
            <NavLink
              class="text-reset me-3 dropdown-toggle hidden-arrow"
              to="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="fas fa-bell"></i>
              <span class="badge rounded-pill badge-notification bg-danger">
                1
              </span>
            </NavLink>
            <ul
              class="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <li>
                <NavLink class="dropdown-item" to="#">
                  Some news
                </NavLink>
              </li>
              <li>
                <NavLink class="dropdown-item" to="#">
                  Another news
                </NavLink>
              </li>
              <li>
                <NavLink class="dropdown-item" to="#">
                  Something else here
                </NavLink>
              </li>
            </ul>
          </div> */}
          
          {isLoggedIn && <div class="dropdown">
            <NavLink
              class="dropdown-toggle d-flex align-items-center hidden-arrow"
              to="#"
              id="navbarDropdownMenuAvatar"
              role="button"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                class="rounded-circle"
                height="25"
                alt="Black and White Portrait of a Man"
                loading="lazy"
              />
            </NavLink>
            <ul
              class="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdownMenuAvatar"
            >
              <li>
                <NavLink class="dropdown-item" to="#">
                  My profile
                </NavLink>
              </li>
              <li>
                <NavLink class="dropdown-item" to="/myBookings">
                  My Bookings
                </NavLink>
              </li>
              <li>
                <button class="dropdown-item" onClick={logOut}>
                  Logout
                </button>
              </li>
            </ul>
          </div> }
        </div> 
      </div>
    </nav>
  );
}

export default BsNavBar;
