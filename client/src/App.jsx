import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import ApplyJob from "./pages/ApplyJob";
import Applications from "./pages/Applications";
import { useState } from "react";
// import { AppContext } from "./context/AppContext";
import Dashboard from "./pages/Dashboard";
import AddJob from "./pages/AddJob";
import ManageJobs from "./pages/ManageJobs";
import ViewApplications from "./pages/ViewApplications";
import "quill/dist/quill.snow.css";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import RefreshHandler from "./RefreshHandler";
import UpdateProfile from "./pages/UpdateProfile";

const App = () => {
  // const { showRecruiterLogin } = useContext(AppContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/update-profile" element={<UpdateProfile />} />

        {/* Private Routes */}
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/apply-job/:id"
          element={isAuthenticated ? <ApplyJob /> : <Navigate to="/login" />}
        />
        <Route
          path="/applications"
          element={
            isAuthenticated ? <Applications /> : <Navigate to="/login" />
          }
        />

        {/* Dashboard and sub-routes */}
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        >
          <Route
            path="add-job"
            element={isAuthenticated ? <AddJob /> : <Navigate to="/login" />}
          />
          <Route
            path="manage-jobs"
            element={
              isAuthenticated ? <ManageJobs /> : <Navigate to="/login" />
            }
          />
          <Route
            path="view-applications"
            element={
              isAuthenticated ? <ViewApplications /> : <Navigate to="/login" />
            }
          />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
