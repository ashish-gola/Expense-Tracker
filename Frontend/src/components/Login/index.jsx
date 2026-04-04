import { Card, Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; 

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";


const { Item } = Form;

const Login = () => {

  const [loginForm] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/user/login", values);
      console.log("Login successful:", data);
      toast.success("Login successful!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to login. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex">
      <div className="w-1/2 hidden md:flex items-center justify-center">
        <img
          src="/exp-img.jpg"
          alt="Login"
          className="w-4/5 object-contain"
        />  
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center p-2 md:p-6 bg-white">
        <Card className="w-full max-w-sm shadow-xl">
          <h2 className="font-bold text-[#FF735C] text-2xl text-center mb-6">
            Track Your Expense
          </h2>
            <Form 
            layout="vertical"
            name="login-form"
            onFinish={onFinish}
            form={loginForm}
            >
                <Item 
                    label="Username"
                    name="email"
                    rules={[ { required: true, message: "Please enter your username" } ]}>
                    <Input
                        prefix={<UserOutlined />}
                        placeholder="Enter your username"
                    />  
                </Item>
                <Item 
                    label="Password"
                    name="password"
                    rules={[ { required: true, message: "Please enter your username" } ]}>
                    <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Enter your password"
                    />  
                </Item>
                <Item>
                    <Button 
                    type="text" 
                    htmlType="submit" 
                    block
                  className="bg-[#FF735C]! text-white font-bold hover:bg-[#FF735C]/90"
                    loading={loading}
                    >
                        Login
                    </Button>
                </Item>
            </Form>
            <div className="flex text-center justify-between">
                <Link
                    style={{ textDecoration: "underline"}}
                    to="#"
                  className="text-[#FF735C]! hover:text-[#FF735C]/90"
                    >
                    Forgot Password?
                </Link>
                <Link
                    style={{ textDecoration: "underline"}}
                    to="/signup"
                  className="text-[#FF735C]! hover:text-[#FF735C]/90"
                    >
                    Don't have an account? 
                </Link>
            </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
