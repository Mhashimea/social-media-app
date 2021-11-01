import { Button, Form, Input, message } from 'antd';
import { get } from 'lodash';
import * as React from 'react';
import { Link } from 'react-router-dom';
import AuthCard from '../../components/auth/authCard';
import AuthLogo from '../../components/auth/authLogo';
import { post } from '../../services/http-request';
import './style.css';

export default function Login() {
  const [loading, setLoading] = React.useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    const response = await post('signin', values);
    if (response.success) {
      message.success('Welcome to Scoial Store');
      localStorage.setItem(
        'token',
        get(response, 'data.stsTokenManager.accessToken')
      );
      localStorage.setItem('isAuth', 'true');
      window.location.href = '/home';
    } else message.error(response.error);
    setLoading(false);
  };
  return (
    <div className="auth">
      <AuthCard className="login-form">
        <AuthLogo />
        <Form
          name="login"
          layout={'vertical'}
          initialValues={{ email: 'johndoe@yopmail.com', password: '123456' }}
          onFinish={onFinish}
          requiredMark={'optional'}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder="Email address" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button
              className="w-full"
              type="primary"
              htmlType="submit"
              loading={loading}
              disabled={loading}
            >
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
          Don't have an account? <Link to={'/register'}>Sign up</Link>
        </h1>
      </AuthCard>
    </div>
  );
}
