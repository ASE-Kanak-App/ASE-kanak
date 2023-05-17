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
import { AiFillLike } from 'react-icons/ai';

const PostContainer = styled.div`
  background: #D7ADAD;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 300px;
  margin: 0 auto;
  margin-top: 10vh;
`;

const PostImage = styled.img`
  width: 300px;
  height: 200px;
  border-radius: 5px;
`;

const LikesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

const PostTitle = styled.h3`
  background: beige;
  padding: 10px;
  border-radius: 5px;
`;

const PostContent = styled.p`
  background: beige;
  padding: 10px;
  border-radius: 5px;
`;

const LikesIcon = styled(AiFillLike)`
  margin-right: 5px;
`;


const UserInfoContainer = styled.div`
  background-color: beige;
  padding: 20px;
  text-align: center;
  width: 300px;
  margin-right: auto;
  margin-left: 7.5vh;
  border-radius: 10px;
  transform: translateY(200%);
`;

const UserName = styled.h1`
  color: #000000;
  font-family: 'Akshar';
  font-size: 24px;
  margin-bottom: 10px;
`;

const Email = styled.p`
  color: #000000;
  font-family: 'Akshar';
  font-size: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const FollowButton = styled(Button)`
  background-color: #40B44B;
  color: #FFFFFF;
  border: none;
  margin-right: 10px;
`;

const UnfollowButton = styled(Button)`
  background-color: #ffaeae;
  color: #FFFFFF;
  border: none;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

const HeaderImage = styled.img`
  height: 5vh;
`;

const NavigationBarContainer = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  top: 15vh; /* Adjust the distance from the header image */
  left: 50%;
  transform: translateX(-50%);
`;
const Post = ({ title, content, image, likes }) => (
    <PostContainer>
        <PostTitle>{title}</PostTitle>
        <PostContent>{content}</PostContent>
        <PostImage
       src={`https://github.com/ASE-Kanak-App/ASE-kanak/blob/dev/frontend/public/images/${image}?raw=true`}
             alt="Post Image"
             style={{ width: '300px', height: '200px'}}
        />
        <LikesContainer>
            <LikesIcon size={18} color="#333" />
            {likes}
        </LikesContainer>
    </PostContainer>
);



export const Name = styled.div`
  background: #D7ADAD;
  font-family: 'Akshar';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 24px;
`;



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
            .get(`http://127.0.0.1:5000/auth/getUserName/?user_id=${id}`)
            // use id parameter in API call
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

            <HeaderContainer>
                <HeaderImage src={headerImage} alt="My Image" style={{
                    position: 'absolute',
                    height: '20vh'
                }} />
            </HeaderContainer>

            <NavigationBarContainer>
                <NavigationBar />
            </NavigationBarContainer>

            <div style={{ display: "flex"}}>
                <UserInfoContainer>
                    <UserName>{user.username}</UserName>
                    <Email>E-Mail: {user.email}</Email>
                    <ButtonContainer>
                        <FollowButton onClick={handleFollow}>Follow</FollowButton>
                        <UnfollowButton onClick={handleUnfollow}>Unfollow</UnfollowButton>
                    </ButtonContainer>
                </UserInfoContainer>
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
