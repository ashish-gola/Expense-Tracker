import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input } from "antd";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
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
      <div className="hidden w-1/2 items-center justify-center md:flex">
        <img src="/exp-img.jpg" alt="Login" className="w-4/5 object-contain" />
      </div>

      <div className="flex w-full items-center justify-center bg-white p-2 md:w-1/2 md:p-6">
        <Card className="w-full max-w-sm shadow-xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-[#FF735C]">Track Your Expense</h2>

          <Form layout="vertical" name="login-form" onFinish={onFinish} form={loginForm}>
            <Item
              label="Username"
              name="email"
              rules={[{ required: true, message: "Please enter your username" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Enter your username" />
            </Item>

            <Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please enter your username" }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Enter your password" />
            </Item>

            <Item>
              <Button
                type="text"
                htmlType="submit"
                block
                className="bg-[#FF735C]! font-bold text-white hover:bg-[#FF735C]/90"
                loading={loading}
              >
                Login
              </Button>
            </Item>
          </Form>

          <div className="flex justify-between text-center">
            <Link
              style={{ textDecoration: "underline" }}
              to="#"
              className="text-[#FF735C]! hover:text-[#FF735C]/90"
            >
              Forgot Password?
            </Link>

            <Link
              style={{ textDecoration: "underline" }}
              to="/signup"
              className="text-[#FF735C]! hover:text-[#FF735C]/90"
            >
              Don&apos;t have an account?
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
