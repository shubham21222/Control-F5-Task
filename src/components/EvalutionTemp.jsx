import React, { useState, useEffect } from "react";
import { firestore } from "firebase/firestore";

const EvaluationTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const [newTemplate, setNewTemplate] = useState({
    title: "",
    criteria: [],
  });
  const [newCriterion, setNewCriterion] = useState("");

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTemplate({ ...newTemplate, [name]: value });
  };

  const handleAddCriterion = () => {
    if (newCriterion.trim() !== "") {
      setNewTemplate({
        ...newTemplate,
        criteria: [...newTemplate.criteria, newCriterion],
      });
      setNewCriterion("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await firestore.collection("evaluationTemplates").add(newTemplate);
    setNewTemplate({
      title: "",
      criteria: [],
    });
  };

  const handleDeleteTemplate = async (id) => {
    await firestore.collection("evaluationTemplates").doc(id).delete();
    setTemplates(templates.filter((template) => template.id !== id));
  };

  return (
    <div>
      <h2>Evaluation Templates</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newTemplate.title}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Add Criterion"
          value={newCriterion}
          onChange={(e) => setNewCriterion(e.target.value)}
        />
        <button type="button" onClick={handleAddCriterion}>Add Criterion</button>
        <ul>
          {newTemplate.criteria.map((criterion, index) => (
            <li key={index}>{criterion}</li>
          ))}
        </ul>
        <button type="submit">Add Template</button>
      </form>
      <ul>
        {templates.map((template) => (
          <li key={template.id}>
            <h3>{template.title}</h3>
            <ul>
              {template.criteria.map((criterion, index) => (
                <li key={index}>{criterion}</li>
              ))}
            </ul>
            <button onClick={() => handleDeleteTemplate(template.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EvaluationTemplates;
