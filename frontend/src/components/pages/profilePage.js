import React, { useState,useEffect } from 'react';
import {Button, Form, Input, Upload, message} from "antd";
import styled from "styled-components";
import { UploadOutlined } from "@ant-design/icons";
import '../../App.css';
import NavigationBar from '../../NavigationBar';
import headerImage from "../images/header2.png";
import ProfilePicture from '../images/dog.png';
import Posts, { PostContainer, Text, Test } from "./postingPageComponents/posts";
import {api} from "../../helpers/api";
import FormData from "form-data";
import PetProfile from "./petProfile";

export const Heading = styled.div`
  background: #D7ADAD;
  font-family: 'Cousine';
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 24px;
  height: 50px;
  text-align: center;
  display: flex;
  align-items: center;
`;
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 10 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-top: -80vh;
`;


const  ProfilePage:React.FC=()=>{

    const [form] = Form.useForm();

    const handleSubmit = async (values) => {
        const formData = new FormData();

        for (const key in values) {
            formData.append(key, values[key]);
        }
        try {
            const response = await fetch('http://127.0.0.1:5000/auth/editUserInfo/', {
                method: 'POST',
                body: formData
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to update user profile: ${errorText}`);
            }
            message.success('User profile updated successfully');
            form.resetFields();
        } catch (error) {
            console.error(error);
            message.error(error.message);
        }

    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };


    let [ProfileData, setProfileData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        intro: '',
        password: ''
    })

    const handleChange = (event) => {
        const { name, value } = event.target


        setProfileData({
            ...ProfileData,
            [name]: value
        })
    }


    return (
        <div
            style={{
                background: 'linear-gradient(' +
                    'to left,' +
                    ' #40B44B  75%,' +
                    ' #7BD37A 75%,' +
                    ' #7BD37A 0%)',
                height: '100vh',
                width: '100vw'
            }}>

            <div className="main-page">
                <img src={headerImage} alt="My Image" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    height: '20vh',
                    textAlign: 'center',
                }} />
            </div>

            <div style={{marginTop: '-5vh'}}>
                <NavigationBar/>
            </div>


            <Form

                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{
                    maxWidth: 450,
                    backgroundColor: "#F5F5DC",
                    borderRadius: "10px",
                    padding: "20px",
                    marginLeft: "2vh",
                    marginTop: "5vh",
                    boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)"
                }}
                {...layout}
                form={form}
                name="profile"
                onFinish={handleSubmit}
                initialValues={{
                    email: '',
                    username: '',
                    firstname: '',
                    lastname: '',
                    intro: '',
                    phone: '',
                    password: '',
                }}
            >
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[{ required: true, message: 'Please enter your email' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="username"
                    label="Username"
                    rules={[{ required: true, message: 'Please enter your username' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="firstname"
                    label="First Name"
                    rules={[{ required: true, message: 'Please enter your first name' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="lastname"
                    label="Last Name"
                    rules={[{ required: true, message: 'Please enter your last name' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="intro"
                    label="Introduction"
                    rules={[{ required: true, message: 'Please enter an introduction' }]}
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    name="phone"
                    label="Phone Number"
                    rules={[{ required: true, message: 'Please enter your phone number' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[{ required: true, message: 'Please enter your password' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Update Profile
                    </Button>
                </Form.Item>

            </Form>

            <Container>
                <PetProfile
                    name="Buddy"
                    age="3 years"
                    description="Buddy is a playful and friendly dog who loves to go for long walks and play fetch in the park."
                />
            </Container>

        </div>
    );
}

export default ProfilePage;
