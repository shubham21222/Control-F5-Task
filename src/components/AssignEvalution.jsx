import React, { useState, useEffect } from "react";
import { firestore } from "firebase/firestore";

const AssignEvaluations = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [evaluations, setEvaluations] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const snapshot = await firestore.collection("employees").get();
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEmployees(data);
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    const fetchTemplates = async () => {
      const snapshot = await firestore.collection("evaluationTemplates").get();
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTemplates(data);
    };

    fetchTemplates();
  }, []);

  const handleAssignEvaluation = async () => {
    if (selectedEmployee !== "" && selectedTemplate !== "") {
      const evaluation = {
        employeeId: selectedEmployee,
        templateId: selectedTemplate,
        completed: false,
      };
      await firestore.collection("evaluations").add(evaluation);
      setEvaluations([...evaluations, evaluation]);
    }
  };

  return (
    <div>
      <h2>Assign Evaluations</h2>
      <select value={selectedEmployee} onChange={(e) => setSelectedEmployee(e.target.value)}>
        <option value="">Select Employee</option>
        {employees.map((employee) => (
          <option key={employee.id} value={employee.id}>{employee.name}</option>
        ))}
      </select>
      <select value={selectedTemplate} onChange={(e) => setSelectedTemplate(e.target.value)}>
        <option value="">Select Template</option>
        {templates.map((template) => (
          <option key={template.id} value={template.id}>{template.title}</option>
        ))}
      </select>
      <button onClick={handleAssignEvaluation}>Assign Evaluation</button>
    </div>
  );
};

export default AssignEvaluations;
