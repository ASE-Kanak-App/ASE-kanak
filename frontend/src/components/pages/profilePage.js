import React, { useState } from 'react';
import {Button, Form, Input, Upload, message} from "antd";
import styled from "styled-components";
import { UploadOutlined } from "@ant-design/icons";
import '../../App.css';
import NavigationBar from '../../NavigationBar';
import headerImage from "../images/header2.png";
import ProfilePicture from '../images/dog.png';
import Posts, { PostContainer, Text, Test } from "./postingPageComponents/posts";

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


function ProfilePage() {
    const [firstName, setFirstName] = useState('John');
    const [lastName, setLastName] = useState('Doe');
    const [bio, setBio] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);

    const handleUpload = (info) => {
        if (info.file.status === "done") {
            message.success(`${info.file.name} file uploaded successfully`);
            setProfilePicture(info.file.originFileObj);
        } else if (info.file.status === "error") {
            message.error(`${info.file.name} file upload failed.`);
        }
    };

    const onFinish = (values) => {
        console.log("Received values of form: ", values);
        console.log("Profile Picture: ", profilePicture);
    };

    let [ProfileData, setProfileData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        intro: ''
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
                    <Heading>{name}</Heading>
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
                    height: '30%'
                }} />
            </div>

            <div style={{ marginLeft:'85vh' ,marginTop: '20vh' }}>
                <NavigationBar />
            </div>


            <FormContainer>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                >

                    <Form.Item>
                        <Upload
                            name="profilePicture"
                            accept=".jpg,.jpeg,.png"
                            action="/api/upload"
                            onChange={handleUpload}
                            showUploadList={false}
                        >
                                <div
                                    style={{ marginLeft: "17vh", width: "250px", height: "250px", backgroundColor: "#f0f0f0", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", marginTop:'-10vh'}}
                                >
                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                        <img
                                            src="frontend/src/components/images/Component 1.png"
                                            alt="Picture"
                                            style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "50%" }}
                                        />
                                        <div style={{ fontSize: "20px", color: "#a0a0a0"}}>
                                            Upload Photo
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>

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
                        <Button htmlType="submit">
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </FormContainer>

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
