import { Input, Form, Button } from "antd";
import * as React from "react";
import { Link } from "react-router-dom";
import AuthCard from "../../components/auth/authCard";
import AuthLogo from "../../components/auth/authLogo";
import "./style.css";

export default function Register() {
  const onFinish = () => {};
  return (
    <div className="auth">
      <AuthCard className="login-form">
        <AuthLogo />
        <Form
          name="login"
          layout={"vertical"}
          initialValues={{}}
          onFinish={onFinish}
          requiredMark={"optional"}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input placeholder="Email address" />
          </Form.Item>

          <Form.Item
            name="firstName"
            rules={[{ required: true, message: "Please input your fullname!" }]}
          >
            <Input placeholder="First name" />
          </Form.Item>
          <Form.Item
            name="lastName"
            rules={[{ required: true, message: "Please input your lastname!" }]}
          >
            <Input placeholder="Last name" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button className="w-full" type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </AuthCard>
      <AuthCard>
        <h1 className="text-center mb-0">
          Already have an account? <Link to={"/"}>Sign in</Link>
        </h1>
      </AuthCard>
    </div>
  );
}
