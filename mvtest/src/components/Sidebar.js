import React from "react";
import "./index.css";
import { AiOutlineHome } from "react-icons/ai";
// import { BiLogOut } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from "../context/UserContext";
import Swal from "sweetalert2";

const Sidebar = () => {
  let navigate = useNavigate()
  const [_, dispatch] = useContext(UserContext)
  const logoutUser = () => {
    dispatch({
      type: "LOGOUT",
    });
    Swal.fire(
      '',
      'You have logged out!!',
      'success'
      )
    setTimeout(() => {
      navigate('/login');
      window.location.reload()
    }, 2000)
  };
  return (
    <div className="sidebar open">
      <ul className="sidebar-menu">
        <li className="sidebar-item">
          <Link className="navigation" to="/">
            <AiOutlineHome style={{ fontSize: "24px" }} />
          </Link>
        </li>

        <li className="sidebar-item">
          <Link className="navigation" to="/user">
            User
          </Link>
        </li>
        <li className="sidebar-item">
          <Link className="navigation" to="/change-pass">
            Change Password
          </Link>
        </li>
        <li className="sidebar-item">
          <Link className="navigation" to="/post">
            Post
          </Link>
        </li>
      </ul>
      <div style={{fontWeight:"700", marginTop:"360px"}} className="text-center">
        <Link onClick={logoutUser} className="text-decoration-none">
          {/* <BiLogOut /> */}
          <p className="mx-3 mt-2 text-dark text-decoration-none">Logout</p>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
