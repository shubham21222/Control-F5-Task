import React, { useState } from "react";
import { firestore } from "../firebase";

const EmployeeForm = () => {
  const [employee, setEmployee] = useState({
    name: "",
    position: "",
    department: "",
    contactDetails: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await firestore.collection("employees").add(employee);
    setEmployee({
      name: "",
      position: "",
      department: "",
      contactDetails: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={employee.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="position"
        placeholder="Position"
        value={employee.position}
        onChange={handleChange}
      />
      <input
        type="text"
        name="department"
        placeholder="Department"
        value={employee.department}
        onChange={handleChange}
      />
      <input
        type="text"
        name="contactDetails"
        placeholder="Contact Details"
        value={employee.contactDetails}
        onChange={handleChange}
      />
      <button type="submit">Add Employee</button>
    </form>
  );
};

export default EmployeeForm;
