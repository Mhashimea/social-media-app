import { Button, Form, Image, Input, message, Radio, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import { get, post } from '../../services/http-request';
import { RootState } from '../../store';
import { setCurrentEmployee } from '../../store/user';
import _ from 'lodash';
import './style.css';

export default function Profile() {
  const dispatch = useDispatch();
  const [model, setModel] = useState<any>({});
  const [loading, setLoading] = useState<Boolean>(true);
  const [buttonLoading, setButtonLoading] = useState<any>(false);
  const user = useSelector((state: RootState) => state.user);

  const onChangeAvatar = async (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e);

    reader.onload = async () => {
      setButtonLoading(true);
      const response = await post('upload-avatar', {
        ...user.currentUser,
        avatar: reader.result,
      });
      if (response.success) {
        message.success('Profile Updated Successfully');
        dispatch(
          setCurrentEmployee({
            ...user.currentUser,
            avatar: reader.result,
          })
        );
      } else {
        message.error('Internal Server Error');
      }
      setButtonLoading(false);
    };
  };

  const onSave = async (values: any) => {
    setButtonLoading(true);
    const payload = {
      uid: _.get(user, 'currentUser.uid'),
      avatar: _.get(user, 'currentUser.avatar'),
      ...values,
    };
    const response = await post('update-user', payload);
    if (response.success) {
      dispatch(setCurrentEmployee(payload));
      message.success('User Updated Successfully');
    } else message.error('Internal Server Error');
    setButtonLoading(false);
  };

  const props = {
    action: '#',
    beforeUpload: onChangeAvatar,
    showUploadList: false,
  };

  useEffect(() => {
    if (_.get(user, 'currentUser.firstName')) {
      setModel(_.get(user, 'currentUser'));
      setLoading(false);
    }
  }, [user]);

  return (
    <div className="profile">
      <h1>Profile Details</h1>
      {loading && <Loader />}
      {!loading && (
        <div className="profile-form">
          <div className="profile-form-avatar">
            <img src={model.avatar} alt="" />
            {buttonLoading ? (
              <span>Updating...</span>
            ) : (
              <Upload {...props}>
                <a>Change Profile Photo</a>
              </Upload>
            )}
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
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Lastname"
              name="lastName"
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Display name"
              name="displayName"
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
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
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <Input placeholder="Email address" disabled />
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
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <Radio.Group>
                <Radio value="M">Male</Radio>
                <Radio value="F">Female</Radio>
              </Radio.Group>
            </Form.Item>
            <div className="profile-form-actions">
              <Button
                type="primary"
                htmlType="submit"
                disabled={buttonLoading}
                loading={buttonLoading}
              >
                Submit
              </Button>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
}
