import React, { useState } from "react";
import Layout from "../../../components/mainComponents/Layout";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const EyeIcon = ({ slashed = false }) => {
  if (!slashed) {
    return (
      <svg
        width="15"
        height="15"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_500_165)">
          <path
            d="M10 4.03907C6.17879 4.03907 2.71351 6.12969 0.15649 9.52542C-0.0521632 9.80362 -0.0521632 10.1923 0.15649 10.4705C2.71351 13.8703 6.17879 15.9609 10 15.9609C13.8212 15.9609 17.2865 13.8703 19.8435 10.4746C20.0522 10.1964 20.0522 9.80771 19.8435 9.52951C17.2865 6.12969 13.8212 4.03907 10 4.03907ZM10.2741 14.1976C7.73755 14.3572 5.64284 12.2665 5.80239 9.72589C5.93331 7.63117 7.63118 5.93331 9.72589 5.80239C12.2625 5.64283 14.3572 7.73345 14.1976 10.2741C14.0626 12.3647 12.3647 14.0626 10.2741 14.1976ZM10.1473 12.2584C8.78081 12.3443 7.65163 11.2192 7.74164 9.85271C7.81119 8.72353 8.72763 7.81119 9.85681 7.73755C11.2233 7.65163 12.3525 8.77672 12.2625 10.1432C12.1888 11.2765 11.2724 12.1888 10.1473 12.2584Z"
            fill="gray"
          />
        </g>
        <defs>
          <clipPath id="clip0_500_165">
            <rect width="20" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
    );
  }

  return (
    <svg
      width="15"
      height="14"
      viewBox="0 0 15 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.6697 2.39488C6.93805 2.35482 7.21488 2.33333 7.5 2.33333C10.8708 2.33333 13.0827 5.33656 13.8258 6.52455C13.9157 6.66833 13.9607 6.74023 13.9858 6.85112C14.0047 6.93439 14.0047 7.06578 13.9858 7.14905C13.9606 7.25993 13.9153 7.3323 13.8248 7.47704C13.6268 7.79343 13.3249 8.23807 12.925 8.7203M4.01625 3.47669C2.58866 4.45447 1.61948 5.81292 1.17488 6.52352C1.08454 6.66791 1.03937 6.74011 1.01419 6.85099C0.995277 6.93426 0.995269 7.06563 1.01417 7.14891C1.03934 7.25979 1.08431 7.33168 1.17424 7.47545C1.91733 8.66344 4.12922 11.6667 7.5 11.6667C8.85914 11.6667 10.0299 11.1784 10.9919 10.5177M1.55739 1L13.4426 13M6.09931 5.58579C5.74085 5.94771 5.51913 6.44772 5.51913 7C5.51913 8.10457 6.406 9 7.5 9C8.047 9 8.54222 8.77614 8.90068 8.41421"
        stroke="white"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="gray"
      />
    </svg>
  );
};

const LoginPage = () => {
  const { formFields, setFormFields } = useState({
    username: "",
    password: "",
  });
  const { login, meAPI } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passswordType, setPasswordType] = useState("password");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login({ username, password });
    console.log(res, "Re");
    // const me = await meAPI();
    if (res?.status == 200) {
      setError("");
      if (res?.data?.user?.is_creator) {
        navigate("/dashboard");
      } else {
        // const me = await meAPI();
        navigate("/");
      }
    } else {
      setError(res?.response?.data?.detail);
    }
  };

  const EyeButton = () => {
    const handleOnClick = () => {
      setPasswordType((prev) => (prev === "password" ? "text" : "password"));
    };
    return (
      <button type="button" onClick={handleOnClick}>
        <EyeIcon slashed={passswordType === "password"} />
      </button>
    );
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
            type="text"
            placeholder="johndoe123"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 mb-4 border rounded focus:outline-none"
          />
          <div className="relative">
            <input
              type={passswordType}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mb-4 border rounded focus:outline-none"
            />
            <div className="absolute right-2 top-[12px]">
              <EyeButton />
            </div>
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}
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
