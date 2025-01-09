import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/AxiosConfig";
import Layout from "../../../components/mainComponents/Layout";
import { useAuth } from "../../../context/AuthContext";
import { Switch } from "@nextui-org/react";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isCreator, setIsCreator] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signup, login, signupCreator } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    try {
      if (isCreator) {
        const response = await signupCreator({
          password: formData.password,
          username: formData?.username,
        });
        if (response?.status === 201 || response?.status === 200) {
          const loginResponse = await login({
            email: formData.username,
            password: formData.password,
          });
          if (loginResponse?.status === 200 || loginResponse?.status === 201) {
            navigate("/");
          }
        } else {
          setError("An error occurred. Please try again.", response);
        }
      } else {
        const response = await signup({
          password: formData.password,
          username: formData?.username,
        });
        if (response?.status === 201 || response?.status === 200) {
          const loginResponse = await login({
            username: formData.username,
            password: formData.password,
          });
          if (loginResponse?.status === 200 || loginResponse?.status === 201) {
            navigate("/");
          }
        } else {
          console.log(response?.response?.data);
          setError("An error occurred. Please try again.", response);
        }
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl shadow-2xl">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
              Create your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <p className="text-red-500 text-center text-sm">{error}</p>
            )}
            {success && (
              <p className="text-green-500 text-center text-sm">{success}</p>
            )}

            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="sr-only">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                {loading ? "Creating Account..." : "Sign Up"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default SignUp;
