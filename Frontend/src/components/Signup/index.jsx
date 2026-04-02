import { Card, Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined, PhoneOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Homelayout from "../../layout/Homelayout.jsx";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

const { Item } = Form;

const Signup = () => {

  const onFinish = async (values) => {
    try {
      const signupRes = await axios.post("/api/user/signup", values);
      await axios.post("/api/user/send-mail", { email: values.email });
      console.log("User created successfully:", signupRes.data);
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      console.error("Error occurred while signing up:", message);
    }
  };

  return (
    <Homelayout>
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
              Register To Track Your Expense
            </h2>
            <Form 
            layout="vertical" 
            name="login-form"
            onFinish={onFinish}>
              <Item
                label="Full Name"
                name="fullname"
                rules={[
                  { required: true, message: "Please enter your username" },
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Enter your full name"
                />
              </Item>
              <Item
                label="Mobile"
                name="mobile"
                rules={[
                  { required: true, message: "Please enter your username" },
                ]}
              >
                <Input
                  prefix={<PhoneOutlined />}
                  placeholder="Enter your mobile number"
                />
              </Item>
              <Item
                label="Username"
                name="email"
                rules={[
                  { required: true, message: "Please enter your username" },
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Enter your username"
                />
              </Item>
              <Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please enter your username" },
                ]}
              >
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
                >
                  Signup
                </Button>
              </Item>
            </Form>
            <div className="flex text-center justify-between">
              <div></div>
              <Link
                style={{ textDecoration: "underline" }}
                to="/"
                className="text-[#FF735C]! hover:text-[#FF735C]/90"
              >
                Already have an account?
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </Homelayout>
  );
};

export default Signup;
