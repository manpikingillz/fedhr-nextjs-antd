'use client'

import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Form, Input } from 'antd';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { signIn } from 'next-auth/react';

function Login() {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  const router = useRouter()

  type LoginCredentials = {
    username: string,
    password: string
  }

  const performLogin = async({username, password}: LoginCredentials) => {
    console.log('Received values of form: ', username, password);
    // const response = await axios.post('http://localhost:8000/api/auth/jwt/login/', {username: 'admin', password: 'admin@#123!'})
    // return response.data

    const response = await signIn('credentials', {
      // redirect: false,
      username: username,
      password: password,
      callbackUrl: '/hr'
    })

    if (response?.error) {
      // handle error
      console.log('response.error: ', response.error)
    } else {
      // custom logic after successful signIn
      console.log('SignIn successful!')
    }
    // if (!response?.error) {
    //   router.push('/hr')
    // }

    console.log('response after login:: ', response)

  }

  // const {} = useMutation({
  //   mutationFn: 
  // })



  return (
    <div className='bg-neutral-100 min-h-screen min-w-full flex justify-center items-center'>
      <Card className='w-96 bg-slate-900 text-center mx-auto'>
      <span className="font-bold text-3xl text-white mb-10">Smooth HR</span>
      <Form
        name="normal_login"
        className='mt-8 text-left'
        initialValues={{ remember: true }}
        onFinish={performLogin}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon h-10" />} placeholder="Username" size='large'/>
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon h-10" />}
            type="password"
            placeholder="Password"
            size='large'
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className='w-full h-10' size='large'>
            Log in
          </Button>
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox className='text-white'>Remember me</Checkbox>
          </Form.Item>

          <a className="text-blue-300" href="">
            Forgot password
          </a>
        </Form.Item>
      </Form>
      </Card>
    </div>
  );
};

export default Login;