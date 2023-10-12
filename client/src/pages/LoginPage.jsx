import React, { useState } from "react";
import InputForm from "../components/shared/inputForm";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { hideLoading, showLoading } from "../redux/feature/alertSlice";
import Spinner from "../components/shared/Spinner";
import { toast } from "react-toastify";
import { logo } from "../assets";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // redux state
  const { loading } = useSelector((state) => state.alerts);

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoading());
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/auth/login",
        {
          email,
          password,
        }
      );
      if (data.success) {
        dispatch(hideLoading());
        localStorage.setItem("token", data.token);
        toast.success("Login SUccessfully ");
        navigate("/dashboard");
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Invalid Credintial please try again!");
      console.log(error);
    }
  };
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        // <h1>Loading</h1>
        <div className="form-container ">
          <form className="card form-card   " onSubmit={handleSubmit}>
            <div className="d-flex justify-content-center">
              <img
                src={logo}
                alt="logo"
                height={150}
                width={80}
                className="img-fluid"
              />
            </div>

            <InputForm
              htmlFor="email"
              labelText={"Email"}
              type={"email"}
              value={email}
              handleChange={(e) => setEmail(e.target.value)}
              name="email"
              placeholder="Enter email"
            />
            <InputForm
              htmlFor="password"
              labelText={"Password"}
              type={"password"}
              value={password}
              handleChange={(e) => setPassword(e.target.value)}
              name="password"
              placeholder="Enter password"
            />

            <div className="d-flex justify-content-between flex-column">
              <p>
                Not a user <Link to="/register">Register Here!</Link>&nbsp;
              </p>
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default LoginPage;
