import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Upload, message } from "antd";
import styled from "styled-components";
import { UploadOutlined } from "@ant-design/icons";
import '../../App.css';
import NavigationBar from '../../NavigationBar';
import headerImage from "../images/header2.png";
import { api } from "../../helpers/api";
import FormData from "form-data";
import { useParams } from "react-router-dom";
import axios from "axios";

export const Name = styled.div`
  background: #D7ADAD;
  font-family: 'Akshar';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 24px;
`;


const Post = ({ title, content, image, likes }) => (
    <div>
        <h3>Title: {title}</h3>
        <p>Content: {content}</p>
        <img src={`https://github.com/ASE-Kanak-App/ASE-kanak/blob/dev/frontend/public/images/${image}?raw=true`} alt="Post Image" />
        <p>Likes: {likes}</p>
    </div>
);

// path: frontend/src/components/pages/userprofilepage.js
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const UserProfilePage: React.FC = () => {
    const { id } = useParams(); // get id parameter from URL
    const [user, setUser] = useState(null);
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:5000/auth/getUserName/?user_id=${id}`) // use id parameter in API call
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.error(error);
            });

        axios
            .get(`http://127.0.0.1:5000/posts/retrieveUserPosts/${id}`)
            .then((response) => {
                setUserPosts(response.data);
                console.log("Nice, that worked")
                console.log("User Posts:", response.data)

            })
            .catch((error) => {
                console.error(error);
            });

    }, [id]);

    if (!user) {
        return <div>Loading...</div>;
    }

    const handleFollow = () => {
        const formData = new FormData();
        formData.append('username', user.username);
        formData.append('email', user.email);

        axios
            .post('http://127.0.0.1:5000/auth/follow/', formData)
            .then((response) => {
                console.log(response.data);
                console.log("You just followed")// Log the response for debugging purposes
                // Add any logic you want to perform after successful follow
            })
            .catch((error) => {
                console.error(error);
            });
    };


    const handleUnfollow = () => {
        const formData = new FormData();
        formData.append('username', user.username);
        formData.append('email', user.email);

        axios
            .post('http://127.0.0.1:5000/auth/unfollow/', formData)
            .then((response) => {
                console.log(response.data);
                console.log("You just unfollowed")// Log the response for debugging purposes
                // Add any logic you want to perform after successful unfollow
            })
            .catch((error) => {
                console.error(error);
            });
    };

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

            <div>
                <img src={headerImage} alt="My Image" style={{
                    position: 'absolute',
                    marginLeft: '70vh',
                    height: '5vh'
                }} />
            </div>

            <div style={{ marginLeft: '50vh' }}>
                <NavigationBar />
            </div>

            <div>
                <h1>{user.username}</h1>
                <p>email: {user.email}</p>
                <h2>Follow the user</h2>
                <Button onClick={handleFollow}>Follow</Button>
                <Button onClick={handleUnfollow}>Unfollow</Button>
            </div>

            <div>
                {userPosts.map((post) => (
                    <div className="aroundAPost" key={post.id} style={{ background: "transparent" }}>
                        <Post
                            title={post.title}
                            content={post.content}
                            image={post.image}
                            likes={post.likes}
                        />
                    </div>
                ))}

            </div>

        </div>
    );
}

export default UserProfilePage;
