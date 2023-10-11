import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputForm from "../components/shared/inputForm";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/feature/alertSlice";
import axios from "axios";
import Spinner from "../components/shared/Spinner";
import { toast } from "react-toastify";
import { logo } from "../assets";

const Register = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //redux state
  const { loading } = useSelector((state) => state.alerts);

  //hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name || !lastName || !email || !password) {
        return toast.error("Please Provide All Fields");
      }
      dispatch(showLoading());
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/auth/register",
        {
          name,
          lastName,
          email,
          password,
        }
      );
      dispatch(hideLoading());
      if (data.success) {
        toast.success("Register Successfully");
        navigate("/login");
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Invalid Form Details Please Try Agian!");
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="form-container ">
          <form className="card form-card  " onSubmit={handleSubmit}>
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
              htmlFor="name"
              labelText={"Name"}
              type={"text"}
              value={name}
              handleChange={(e) => setName(e.target.value)}
              name="name"
              placeholder="Enter Your Name"
            />
            <InputForm
              htmlFor="lastName"
              labelText={"Last Name"}
              type={"text"}
              value={lastName}
              handleChange={(e) => setLastName(e.target.value)}
              name="lastName"
              placeholder="Enter Last Name"
            />
            <InputForm
              htmlFor="email"
              labelText={"Email"}
              type={"email"}
              value={email}
              handleChange={(e) => setEmail(e.target.value)}
              name="email"
              placeholder="Enter E-mail"
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
              <p className="text-white">
                Already Register <Link to="/login">Login</Link>{" "}
              </p>
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Register;
