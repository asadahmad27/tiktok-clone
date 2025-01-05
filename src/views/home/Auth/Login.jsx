import React, { useState } from "react";
import { TInput } from "../../../components/commonComponents";
import Layout from "../../../components/mainComponents/Layout";
import { Button, Input } from "@nextui-org/react";
import { useAuth } from './AuthContext';



const LoginPage = () => {
  const { formFields, setFormFields } = useState({ email: "", password: "" });
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <Layout>
      {/* <div className="bg-white shadow-md max-w-[95%] mx-auto h-[85vh] flex items-center justify-center rounded-lg">
        <div className="w-[40%] mx-auto shadow-xl p-16">
          <p className="text-xl font-semibold text-center mb-8">Login</p>
          <Input className="mb-4" />
          <Input />
          <Button className="w-full mt-4" color="primary" variant="flat">
            Login
          </Button>
        </div>
      </div> */}

      <div className="flex items-center justify-center h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md w-96"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 border rounded focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-4 border rounded focus:outline-none"
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default LoginPage;
