import React, { useState } from "react";
import { TInput } from "../../../components/commonComponents";
import Layout from "../../../components/mainComponents/Layout";
import { Button, Input } from "@nextui-org/react";

const LoginPage = () => {
  const { formFields, setFormFields } = useState({ email: "", password: "" });
  return (
    <Layout>
      <div className="bg-white shadow-md max-w-[95%] mx-auto h-[85vh] flex items-center justify-center rounded-lg">
        <div className="w-[40%] mx-auto shadow-xl p-16">
          <p className="text-xl font-semibold text-center mb-8">Login</p>
          <Input className="mb-4" />
          <Input />
          <Button className="w-full mt-4" color="primary" variant="flat">
            Login
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
