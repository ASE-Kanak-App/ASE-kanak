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

    const FormContainer = styled.div`
    position: relative;
    margin-right: 10vh;
    margin-top: 25vh;  
    width: 425px;
    height: 243px;
    `;

    const Post = ({ post: { name, text, file } }) => {
        return (
            <PostContainer>
                <Test>
                    {/* <Heading>{name}</Heading>*/}
                    <Text>{text}</Text>
                    <img className="image" src={file} alt="" />
                </Test>
            </PostContainer>
        );
    };

    const posts = [
        {
            name: "Karim Abouel Naga",
            text: `Hello this is a first post!`,
            file: 'https://fei-fan-production.s3.amazonaws.com/s3fs-public/styles/full_page_image/public/250122-friend-1.jpg?itok=0W5QyNM5',
        }
    ];

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
                style={{ maxWidth: 600 }}
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

            <div className='news-feed-container2'>
                {posts.map((post) => (
                    <div className="aroundAPost" style={{background: "transparent"}}>
                        <Post  post={post} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProfilePage;
