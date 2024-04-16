import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";

const Dashboard = () => {
  const { currentUser } = useAuth();

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, {currentUser.email}</p>
      <ul>
        <li>
          <Link to="/analytics">View Analytics</Link>
        </li>
        <li>
          <Link to="/leave/request">Submit Leave Request</Link>
        </li>
        <li>
          <Link to="/leave/requests">View Leave Requests</Link>
        </li>
        <li>
          <Link to="/evaluations/templates">Manage Evaluation Templates</Link>
        </li>
        <li>
          <Link to="/evaluations/assign">Assign Evaluations</Link>
        </li>
      </ul>
    </div>
  );
};

export default Dashboard;
