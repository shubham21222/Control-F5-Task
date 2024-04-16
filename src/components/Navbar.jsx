import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";

const Navbar = () => {
  const { currentUser, logout } = useAuth();

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/analytics">Analytics</Link>
        </li>
        {currentUser ? (
          <>
            <li>
              <Link to="/leave/request">Leave Request</Link>
            </li>
            <li>
              <Link to="/leave/requests">Leave Requests</Link>
            </li>
            <li>
              <Link to="/evaluations/templates">Evaluation Templates</Link>
            </li>
            <li>
              <Link to="/evaluations/assign">Assign Evaluations</Link>
            </li>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
