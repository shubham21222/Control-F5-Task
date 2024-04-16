import React, { useState, useEffect } from "react";
import { firestore } from "../firebase";

const Applicants = () => {
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    const fetchApplicants = async () => {
      const snapshot = await firestore.collection("applicants").get();
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setApplicants(data);
    };

    fetchApplicants();
  }, []);

  const handleReviewResume = (id) => {
    // Implement functionality to review resume
  };

  const handleScheduleInterview = (id) => {
    // Implement functionality to schedule interview
  };

  const handleUpdateApplicationStatus = (id, status) => {
    // Implement functionality to update application status
  };

  return (
    <div>
      <h2>Applicants</h2>
      <ul>
        {applicants.map((applicant) => (
          <li key={applicant.id}>
            <h3>{applicant.name}</h3>
            <p>{applicant.email}</p>
            <p>{applicant.resume}</p>
            <p>Status: {applicant.status}</p>
            <button onClick={() => handleReviewResume(applicant.id)}>Review Resume</button>
            <button onClick={() => handleScheduleInterview(applicant.id)}>Schedule Interview</button>
            <button onClick={() => handleUpdateApplicationStatus(applicant.id, "Accepted")}>Accept</button>
            <button onClick={() => handleUpdateApplicationStatus(applicant.id, "Rejected")}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Applicants;
