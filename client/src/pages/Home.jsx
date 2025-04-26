import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import JobListing from "../components/JobListing";
import AppDownload from "../components/AppDownload";
import Footer from "../components/Footer";

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userName = localStorage.getItem("loggedInUser");
    if (userName) {
      setUser({ name: userName });
    }
  }, []);

  return (
    <div>
      <Navbar />
      {user ? (
        <>
          <Hero />
          <JobListing />
          <AppDownload />
        </>
      ) : (
        <h1>Please log in to view your home page.</h1>
      )}
      <Footer />
    </div>
  );
};

export default Home;
