import { Card, Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Item } = Form;

const Login = () => {
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
            name="login-form">
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
                  className="bg-[#FF735C]! text-white font-bold hover:bg-[#FF735C]/90">
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
