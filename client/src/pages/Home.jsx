import AppDownload from "../components/AppDownload";
import Hero from "../components/Hero";
import JobListing from "../components/JobListing";
import Navbar from "../components/Navbar";

const Home = () => {
  return <div>
    <Navbar/>
    <Hero/>
    <JobListing/>
    <AppDownload/>
  </div>;
};

export default Home;
