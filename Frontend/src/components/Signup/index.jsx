import { useState } from "react";
import { Card, Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined, PhoneOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Homelayout from "../../layout/Homelayout.jsx";
import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

const { Item } = Form;

const Signup = () => {


  const [signupForm] = Form.useForm();

  const [formData, setFormData] = useState(null);
  const [otp, setOtp] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
    

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const normalizedValues = {
        ...values,
        email: values.email?.toLowerCase().trim(),
      };
      const { data } = await axios.post("/api/user/send-mail", normalizedValues);
      const generatedOtp = String(data?.otp ?? "");
      setOtp(generatedOtp);
      setOtpSent(true);
      setFormData(normalizedValues);
      console.log("OTP sent successfully:", generatedOtp);
    } catch (error) {
      setOtp(null);
      setOtpSent(false);
      setFormData(null);
      console.error("Error sending OTP:", error);
      if (error.response?.status === 409) {
        toast.error("User already exists with this email. Please login instead.");
        return;
      }

      toast.error(error.response?.data?.message || "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

   const onSignup = async (values) => {
    try {
      setVerifyingOtp(true);
      if (String(values.otp).trim() !== String(otp).trim()) {
        return toast.error("OTP not matched. Please try again.");
      }
      await axios.post("/api/user/signup", formData);
      toast.success("Signup successful!");
      setOtp(null);
      setOtpSent(false);
      setFormData(null);
      signupForm.resetFields();
    } catch (error) {
      if (error.response?.status === 409) {
        setOtp(null);
        setOtpSent(false);
        setFormData(null);
        toast.error("User already exists with this email. Please login instead.");
        return;
      }

      console.error("Signup failed:", error);
      toast.error(error.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setVerifyingOtp(false);
    }
  };

  const formContent = otpSent ? (
    <Form layout="vertical" name="otp-form" onFinish={onSignup}>
      <Item
        label="Otp"
        name="otp"
        rules={[{ required: true, message: "Please enter your OTP" }]}
      >
        <Input
          placeholder="Enter 6 digit OTP"
          inputMode="numeric"
          maxLength={6}
          autoComplete="one-time-code"
          className="h-12 rounded-xl border-2 border-dashed border-[#FF735C]/30 text-center text-lg font-semibold tracking-[0.5em] placeholder:text-gray-300 focus:border-[#FF735C] focus:shadow-[0_0_0_3px_rgba(255,115,92,0.12)]"
        />
      </Item>
      <Item>
        <Button
          loading={verifyingOtp}
          type="text"
          htmlType="submit"
          block
          className="bg-[#FF735C]! text-white font-bold hover:bg-[#FF735C]/90"
        >
          Verify Now
        </Button>
      </Item>
    </Form>
  ) : (
    <Form
      layout="vertical"
      name="signup-form"
      onFinish={onFinish}
      form={signupForm}
    >
      <Item
        label="Full Name"
        name="fullname"
        rules={[{ required: true, message: "Please enter your username" }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Enter your full name" />
      </Item>
      <Item
        label="Mobile"
        name="mobile"
        rules={[{ required: true, message: "Please enter your username" }]}
      >
        <Input prefix={<PhoneOutlined />} placeholder="Enter your mobile number" />
      </Item>
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
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Enter your password"
        />
      </Item>
      <Item>
        <Button
          loading={loading}
          type="text"
          htmlType="submit"
          block
          className="bg-[#FF735C]! text-white font-bold hover:bg-[#FF735C]/90"
        >
          Signup
        </Button>
      </Item>
    </Form>
  );


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
            {formContent}
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
