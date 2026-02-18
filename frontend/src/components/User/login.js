import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, clearErrors } from "../../actions/userAction";
import { useAlert } from "react-alert";
import Loader from "../Layout/loader";

const Login = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { isAuthenticated, error, loading, user } = useSelector(
    (state) => state.user
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Redirect after login (important for checkout flow)
  const redirect = window.location.search
    ? "/" + new URLSearchParams(window.location.search).get("redirect")
    : "/account";

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      if (user?.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate(redirect);
      }
    }
  }, [dispatch, error, alert, isAuthenticated, user, navigate, redirect]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {loading ? (
        <Loader />
      ) : (
        <div className="shadow-lg max-w-md md:w-[30%] w-[90%] p-6 bg-white rounded-lg">
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            Sign In
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <h1 className="text-gray-700 mb-2">Email</h1>

              <TextField
                fullWidth
                required
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <h1 className="text-gray-700 mb-2">Password</h1>

              <TextField
                fullWidth
                required
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Sign In
            </button>
          </form>

          <p className="mt-4 text-center">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-500 hover:text-blue-600 font-semibold"
            >
              Sign Up
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default Login;
