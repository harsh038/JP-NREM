import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { handleSucess } from "../utils";
import { ToastContainer } from "react-toastify";

function Navbar() {
  const navigate = useNavigate();
  const { setShowRecruiterLogin } = useContext(AppContext);
  const [loggedInUser, setLoggedInUser] = useState("");
  const [showDropdown, setShowDropdown] = useState(false); // Manage dropdown visibility

  useEffect(() => {
    // Get the logged-in user from localStorage
    const user = localStorage.getItem("loggedInUser");
    setLoggedInUser(user);
  }, []);

  const handleLogout = () => {
    // Clear user and token data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSucess("User logged out");
    setTimeout(() => {
      navigate("/login"); // Redirect to login after 1 second
    }, 1000);
  };

  const handleProfileClick = () => {
    setShowDropdown(!showDropdown); // Toggle dropdown visibility
  };

  const handleUpdateProfile = () => {
    navigate("/update-profile"); // Navigate to update profile page
  };

  return (
    <div className="shadow py-4 bg-white">
      <div className="container px-4 mx-auto flex items-center justify-between">
        {/* Logo on left */}
        <div>
          <img
            onClick={() => navigate("/")}
            className="cursor-pointer h-12"
            src={assets.logo}
            alt="logo"
          />
        </div>

        {/* Navbar Links & Profile Section */}
        <div className="flex items-center gap-6 ml-auto">
          {loggedInUser ? (
            <>
              <Link
                to="/applications"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Applied Jobs
              </Link>
              <span className="ml-4 text-gray-700">Welcome back, {loggedInUser}!</span>

              <div className="relative group ml-6">
                <div
                  className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-full cursor-pointer"
                  onClick={handleProfileClick}
                >
                  {loggedInUser?.charAt(0)?.toUpperCase()}
                </div>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 bg-white border rounded shadow-md w-40">
                    <button
                      onClick={handleUpdateProfile}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      Update Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => setShowRecruiterLogin(true)}
                className="text-gray-600 hover:text-blue-600 text-sm font-semibold"
              >
                Recruiter Login
              </button>
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-semibold"
              >
                Login
              </button>
            </>
          )}
        </div>

        <ToastContainer />
      </div>
    </div>
  );
}

export default Navbar;
