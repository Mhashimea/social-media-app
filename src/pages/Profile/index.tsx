import React, { useState } from 'react';
import { Button, Form, Input, Radio, Upload } from 'antd';
import './style.css';
import { CameraOutline } from 'react-ionicons';

export default function Profile() {
  const [model, setModel] = useState({
    firstName: 'John',
    lastName: 'Doe',
    displayName: 'John Doe',
    avatar: 'https://i.pravatar.cc/150?img=8',
    gender: 'M',
    email: 'johndoe@yopmail.com',
  });

  const onSave = (values: any) => {
    console.log(values);
  };

  return (
    <div className="profile">
      <h1>Profile Details</h1>
      <div className="profile-form">
        <div className="profile-form-avatar">
          <img src={model.avatar} alt="" />
          <Upload>
            <a>Change Profile Photo</a>
          </Upload>
        </div>
        <Form
          layout={'inline'}
          name="profile-form"
          initialValues={model}
          onFinish={onSave}
          requiredMark={'optional'}
          className="profile-form-controls"
        >
          <Form.Item
            label="Firstname"
            name="firstName"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Lastname"
            name="lastName"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Display name"
            name="displayName"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
          <div className="profile-form-desc">
            <div style={{ width: '34%' }}></div>
            <p className="desc">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Architecto consectetur sunt, neque enim pra
            </p>
          </div>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder="Email address" />
          </Form.Item>{' '}
          <div className="profile-form-desc">
            <div style={{ width: '34%' }}></div>
            <p className="desc">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Architecto consectetur sunt, neque enim pra
            </p>
          </div>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Radio.Group>
              <Radio value="M">Male</Radio>
              <Radio value="F">Female</Radio>
            </Radio.Group>
          </Form.Item>
          <div className="profile-form-actions">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
