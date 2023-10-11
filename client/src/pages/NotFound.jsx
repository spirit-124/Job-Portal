import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className=" not-found">
      <h1>Page Not Found</h1>
      <Link className="btn btn-success" to="/">
        Go Back
      </Link>
    </div>
  );
};

export default NotFound;
