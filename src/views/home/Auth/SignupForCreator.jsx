import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import Layout from "../../../components/mainComponents/Layout";
import { useAuth } from "../../../context/AuthContext";

const SignUpForCreator = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate
  const { login, signupCreator, setUser, user } = useAuth();
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

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    // if (user?.username == formData?.username) {
    //   setError("Username can't be same!");
    //   return;
    // }

    try {
      setUser(null);
      const response = await signupCreator({
        password: formData.password,
        username: formData?.username,
      });
      if (response?.status === 201 || response?.status === 200) {
        const loginResponse = await login({
          username: formData.username,
          password: formData.password,
        });
        if (loginResponse?.status === 200 || loginResponse?.status === 201) {
          navigate("/admin-dashboard");
        }
      } else {
        setError("An error occurred. Please try again.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md w-96"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">
            Sign Up for Creator
          </h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}
          <input
            type="text"
            name="username"
            placeholder="@johndoe123"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-3 mb-3 border rounded focus:outline-none"
          />
          {/* <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 mb-3 border rounded focus:outline-none"
          /> */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 mb-3 border rounded focus:outline-none"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-3 mb-4 border rounded focus:outline-none"
          />
          {/* <Switch
            value={isCreator}
            onChange={() => setIsCreator((prev) => !prev)}
          >
            {isCreator ? "As Creator" : "As Consumer"}
          </Switch> */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mt-4"
            disabled={loading}
          >
            Become Creator
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default SignUpForCreator;
