import React, { useState, useEffect } from "react";
import { firestore } from "../firebase";

const JobPostings = () => {
  const [jobPostings, setJobPostings] = useState([]);
  const [newJobPosting, setNewJobPosting] = useState({
    title: "",
    description: "",
    requirements: "",
    deadline: "",
  });

  useEffect(() => {
    const fetchJobPostings = async () => {
      const snapshot = await firestore.collection("jobPostings").get();
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setJobPostings(data);
    };

    fetchJobPostings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewJobPosting({ ...newJobPosting, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await firestore.collection("jobPostings").add(newJobPosting);
    setNewJobPosting({
      title: "",
      description: "",
      requirements: "",
      deadline: "",
    });
  };

  const handleDelete = async (id) => {
    await firestore.collection("jobPostings").doc(id).delete();
    setJobPostings(jobPostings.filter((jobPosting) => jobPosting.id !== id));
  };

  return (
    <div>
      <h2>Job Postings</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newJobPosting.title}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={newJobPosting.description}
          onChange={handleChange}
        ></textarea>
        <input
          type="text"
          name="requirements"
          placeholder="Requirements"
          value={newJobPosting.requirements}
          onChange={handleChange}
        />
        <input
          type="date"
          name="deadline"
          placeholder="Deadline"
          value={newJobPosting.deadline}
          onChange={handleChange}
        />
        <button type="submit">Add Job Posting</button>
      </form>
      <ul>
        {jobPostings.map((jobPosting) => (
          <li key={jobPosting.id}>
            <h3>{jobPosting.title}</h3>
            <p>{jobPosting.description}</p>
            <p>{jobPosting.requirements}</p>
            <p>Deadline: {jobPosting.deadline}</p>
            <button onClick={() => handleDelete(jobPosting.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobPostings;
