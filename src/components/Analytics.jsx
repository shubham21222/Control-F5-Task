import React, { useState, useEffect } from "react";
import { firestore } from "firebase/firestore";
import { Bar } from 'react-chartjs-2';

const Analytics = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [recruitmentData, setRecruitmentData] = useState([]);
  const [evaluationData, setEvaluationData] = useState([]);
  const [leaveData, setLeaveData] = useState([]);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      const snapshot = await firestore.collection("employees").get();
      const data = snapshot.docs.map((doc) => doc.data());
      // Process employee data and set state
      setEmployeeData(data);
    };

    const fetchRecruitmentData = async () => {
      const snapshot = await firestore.collection("recruitment").get();
      const data = snapshot.docs.map((doc) => doc.data());
      // Process recruitment data and set state
      setRecruitmentData(data);
    };

    const fetchEvaluationData = async () => {
      const snapshot = await firestore.collection("evaluations").get();
      const data = snapshot.docs.map((doc) => doc.data());
      // Process evaluation data and set state
      setEvaluationData(data);
    };

    const fetchLeaveData = async () => {
      const snapshot = await firestore.collection("leaveRequests").get();
      const data = snapshot.docs.map((doc) => doc.data());
      // Process leave data and set state
      setLeaveData(data);
    };

    fetchEmployeeData();
    fetchRecruitmentData();
    fetchEvaluationData();
    fetchLeaveData();
  }, []);

  // Example: Generate employee age distribution
  const generateAgeDistribution = () => {
    const ageDistribution = {};
    employeeData.forEach((employee) => {
      const age = new Date().getFullYear() - new Date(employee.birthDate).getFullYear();
      if (ageDistribution[age]) {
        ageDistribution[age]++;
      } else {
        ageDistribution[age] = 1;
      }
    });
    return ageDistribution;
  };

  // Example: Generate recruitment metrics
  const generateRecruitmentMetrics = () => {
    const totalJobPostings = recruitmentData.length;
    // Other metrics calculation
    return {
      totalJobPostings,
      // Other metrics
    };
  };

  // Example: Generate performance evaluation metrics
  const generateEvaluationMetrics = () => {
    const totalEvaluations = evaluationData.length;
    // Other metrics calculation
    return {
      totalEvaluations,
      // Other metrics
    };
  };

  // Example: Generate leave trends
  const generateLeaveTrends = () => {
    const leaveTrends = {};
    leaveData.forEach((leave) => {
      const startDate = new Date(leave.startDate);
      const month = startDate.getMonth() + 1;
      if (leaveTrends[month]) {
        leaveTrends[month]++;
      } else {
        leaveTrends[month] = 1;
      }
    });
    return leaveTrends;
  };

  const ageDistributionData = {
    labels: Object.keys(generateAgeDistribution()),
    datasets: [
      {
        label: 'Age Distribution',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 1,
        data: Object.values(generateAgeDistribution())
      }
    ]
  };

  const recruitmentMetrics = generateRecruitmentMetrics();

  const evaluationMetrics = generateEvaluationMetrics();

  const leaveTrendsData = {
    labels: Object.keys(generateLeaveTrends()),
    datasets: [
      {
        label: 'Leave Trends',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: Object.values(generateLeaveTrends())
      }
    ]
  };

  return (
    <div>
      <h2>Analytics and Reporting</h2>
      <div>
        <h3>Employee Age Distribution</h3>
        <Bar
          data={ageDistributionData}
          options={{
            title:{
              display:true,
              text:'Employee Age Distribution',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
      <div>
        <h3>Recruitment Metrics</h3>
        <p>Total Job Postings: {recruitmentMetrics.totalJobPostings}</p>
        {/* Display other recruitment metrics */}
      </div>
      <div>
        <h3>Performance Evaluation Metrics</h3>
        <p>Total Evaluations: {evaluationMetrics.totalEvaluations}</p>
        {/* Display other evaluation metrics */}
      </div>
      <div>
        <h3>Leave Trends</h3>
        <Bar
          data={leaveTrendsData}
          options={{
            title:{
              display:true,
              text:'Leave Trends',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
    </div>
  );
};

export default Analytics;
