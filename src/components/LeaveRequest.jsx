import React, { useState, useEffect } from "react";
import { firestore } from "firebase/firestore";

const LeaveRequests = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      const snapshot = await firestore.collection("leaveRequests").get();
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLeaveRequests(data);
    };

    fetchLeaveRequests();
  }, []);

  const handleApprove = async (id) => {
    await firestore.collection("leaveRequests").doc(id).update({ status: "Approved" });
    setLeaveRequests(leaveRequests.map(request => request.id === id ? { ...request, status: "Approved" } : request));
    // Send notification to employee
  };

  const handleReject = async (id) => {
    await firestore.collection("leaveRequests").doc(id).update({ status: "Rejected" });
    setLeaveRequests(leaveRequests.map(request => request.id === id ? { ...request, status: "Rejected" } : request));
    // Send notification to employee
  };

  return (
    <div>
      <h2>Leave Requests</h2>
      <ul>
        {leaveRequests.map((request) => (
          <li key={request.id}>
            <p>Type: {request.type}</p>
            <p>Start Date: {request.startDate}</p>
            <p>End Date: {request.endDate}</p>
            <p>Reason: {request.reason}</p>
            <p>Status: {request.status}</p>
            {request.status === "Pending" && (
              <>
                <button onClick={() => handleApprove(request.id)}>Approve</button>
                <button onClick={() => handleReject(request.id)}>Reject</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaveRequests;
