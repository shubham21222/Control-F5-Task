import React, { useState } from "react";
import { firestore } from "firebase/firestore";

const LeaveRequestForm = () => {
  const [leaveRequest, setLeaveRequest] = useState({
    type: "",
    startDate: "",
    endDate: "",
    reason: "",
    status: "Pending",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeaveRequest({ ...leaveRequest, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await firestore.collection("leaveRequests").add(leaveRequest);
    setLeaveRequest({
      type: "",
      startDate: "",
      endDate: "",
      reason: "",
      status: "Pending",
    });
  };

  return (
    <div>
      <h2>Submit Leave Request</h2>
      <form onSubmit={handleSubmit}>
        <select
          name="type"
          value={leaveRequest.type}
          onChange={handleChange}
        >
          <option value="">Select Leave Type</option>
          <option value="Vacation">Vacation</option>
          <option value="Sick Leave">Sick Leave</option>
          <option value="Personal Leave">Personal Leave</option>
        </select>
        <input
          type="date"
          name="startDate"
          placeholder="Start Date"
          value={leaveRequest.startDate}
          onChange={handleChange}
        />
        <input
          type="date"
          name="endDate"
          placeholder="End Date"
          value={leaveRequest.endDate}
          onChange={handleChange}
        />
        <textarea
          name="reason"
          placeholder="Reason for Leave"
          value={leaveRequest.reason}
          onChange={handleChange}
        ></textarea>
        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
};

export default LeaveRequestForm;
