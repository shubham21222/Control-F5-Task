import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "../src/Context/AuthProvider";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import Dashboard from "./components/DashBoard";
import Analytics from "./components/Analytics";
import LeaveRequestForm from "./components/LeaveRequestForm";
import LeaveRequests from "./components/LeaveRequest";    
import EvaluationTemplates from "./components/EvalutionTemp";
import AssignEvaluations from "./components/AssignEvalution";
import Auth from "./components/Auth";


function App() {
  return (  
    <div className="App">
      <Router>
        <AuthProvider>
          <Navbar />
          <Switch>
            <Route path="/login" component={Auth} />
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateRoute exact path="/analytics" component={Analytics} />
            <PrivateRoute exact path="/leave/request" component={LeaveRequestForm} />
            <PrivateRoute exact path="/leave/requests" component={LeaveRequests} />
            <PrivateRoute exact path="/evaluations/templates" component={EvaluationTemplates} />
            <PrivateRoute exact path="/evaluations/assign" component={AssignEvaluations} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
