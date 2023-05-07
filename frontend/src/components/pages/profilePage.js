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

const  ProfilePage:React.FC=()=>{

    const [firstName, setFirstName] = useState('John');
    const [lastName, setLastName] = useState('Doe');
    const [bio, setBio] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);

    const onFinish = (values: any) => {
        console.log('Success:', values);
        editProfile()

    };

    const editProfile=async()=>{
        const FormData = require('form-data');
        let data = new FormData();
        data.append('username',ProfileData.username);
        data.append('firstname', ProfileData.firstName);
        data.append('lastname',ProfileData.lastName);

        data.append('phone', ProfileData.phone);
        data.append('intro', ProfileData.intro);

        data.append('email', ProfileData.email);
        data.append('password', ProfileData.password);
        console.log("data "+data);

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'auth/editUserInfo/',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data : data
        };

        api.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                alert("You have successfully edit")
            }).catch(e=>console.log(e))


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
        }}>>

            <div>
                <img src={headerImage} alt="My Image" style={{
                    position: 'absolute',
                    marginLeft: '70vh',
                    height: '5vh'
                }} />
            </div>

            <div style={{ marginLeft:'50vh' ,marginTop: '20vh' }}>
                <NavigationBar />
            </div>


                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input onChange={handleChange} name='username'/>
                    </Form.Item>

                    <Form.Item

                        label="First Name"
                        name="firstName"
                        rules={[{ required: true, message: 'Please input your First Name!' }]}
                    >
                        <Input onChange={handleChange} name='firstname'/>
                    </Form.Item>
                    <Form.Item
                        label="Last Name"
                        name="lastName"
                        rules={[{ required: true, message: 'Please input your Last Name!' }]}
                    >
                        <Input onChange={handleChange} name='lastname'/>
                    </Form.Item>

                    <Form.Item
                        label="Phone Number"
                        name="phoneNumber"
                        rules={[{ required: true, message: 'Please input your Phone Number!' }]}
                    >
                        <Input onChange={handleChange} name='phone'/>
                    </Form.Item>
                    <Form.Item
                        label="Introduction"
                        name="introduction"
                        rules={[{ min: 8, required: true, message: 'Please input an introduction!' }]}
                    >
                        <Input onChange={handleChange} name='intro'/>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button htmlType="submit" >
                            Save
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
