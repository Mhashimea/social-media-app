import { Input, Form, Button } from "antd";
import * as React from "react";
import { Link } from "react-router-dom";
import AuthCard from "../../components/auth/authCard";
import AuthLogo from "../../components/auth/authLogo";
import "./style.css";

export default function Login() {
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
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Email address" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button className="w-full" type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
        <div className="text-center">
          <a href="#" className="w-full">
            Forgot your password?
          </a>
        </div>
      </AuthCard>
      <AuthCard>
        <h1 className="text-center mb-0">
          Don't have an account? <Link to={"/register"}>Sign up</Link>
        </h1>
      </AuthCard>
    </div>
  );
}
