import React from "react";
import { Link } from "react-router-dom";
import "../styles/HomePage.css";
import { backgroundVideo, logo } from "../assets";
const HomePage = () => {
  return (
    <>
      <video autoPlay muted loop id="myVideo">
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      <div className="content">
        <div className="Home-card w-25 p-4 ">
          <div>
            <img src={logo} alt="logo" height={80} width={90} />
          </div>
          <hr />
          <div className="card-body">
            <h5 className="card-title">Indias No #1 Carrer Platform</h5>
            <p className="card-text">
              Search and manage your jobs with ease. free and open source job
              ortal application by techinfoyt
            </p>
            <div className="d-flex justify-content-between mt-5">
              <p>
                Not a user Register <Link to="/register">Here !</Link>{" "}
              </p>
              <p>
                <Link to="/login" className="myBtn">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
