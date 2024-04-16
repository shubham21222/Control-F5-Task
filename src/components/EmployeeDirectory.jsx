import React, { useState, useEffect } from "react";
import { firestore } from "../firebase";
import EmployeeForm from "./EmployeeForm";

const EmployeeDirectory = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const snapshot = await firestore.collection("employees").get();
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEmployees(data);
      setFilteredEmployees(data);
    };

    fetchEmployees();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    filterEmployees(e.target.value);
  };

  const filterEmployees = (term) => {
    if (!term) {
      setFilteredEmployees(employees);
    } else {
      const filtered = employees.filter((employee) =>
        employee.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredEmployees(filtered);
    }
  };

  const handleDelete = async (id) => {
    await firestore.collection("employees").doc(id).delete();
    setEmployees(employees.filter((employee) => employee.id !== id));
    setFilteredEmployees(filteredEmployees.filter((employee) => employee.id !== id));
  };

  return (
    <div>
      <h2>Employee Directory</h2>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <EmployeeForm />
      <ul>
        {filteredEmployees.map((employee) => (
          <li key={employee.id}>
            <div>
              <h3>{employee.name}</h3>
              <p>{employee.position}</p>
              <p>{employee.department}</p>
              <p>{employee.contactDetails}</p>
            </div>
            <button onClick={() => handleDelete(employee.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeDirectory;
