import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="nav">
      <h1>Capacity Manager</h1>
      <ul>
        <li>Notifications</li>
        <li>
          <Link to="/bw" >Home</Link>
        </li>
        <li>
          <Link to="/settings" >Settings</Link>
        </li>
      </ul>
    </div>
  )
};

module.exports = NavBar;
