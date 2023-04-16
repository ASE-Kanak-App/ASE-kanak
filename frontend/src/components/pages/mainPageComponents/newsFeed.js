import React, { useState, useEffect } from 'react';
import '../../../App.css';
import styled from "styled-components";
import {
    ProfileOutlined,
    LogoutOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {View} from "react-native";
import {Space} from "antd";

const customStyle1 = {
    backgroundColor: 'transparent',
    padding: '10px',
    border: "none",
}

const iconStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
    textAlign: 'center',
    color: 'black',
    fontSize: '20px',
}

const PostContainer = styled.div`
  font-size: 1.5em;
  text-align: left;
  background: 'linear-gradient(' +
            ' #7BD37A 0%,' +
            ' #40B44B 100%)';
  display: flex;
  flex-direction: column;
  padding: 3%;
  margin: 0 2%;
`;

const Heading = styled.div`
  background: #D7ADAD;
  font-family: 'Cousine';
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 24px;
  height: 126px;
  text-align: center;
  display: flex;
  align-items: center;
`;

const Text =styled.div`
  background: #D7ADAD;
  font-family: 'Akshar';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 24px;
 `;
const Test =styled.div`
  background: #D7ADAD;
  font-size: 15px;
  line-height: 24px;
  display: flex;
  flex-direction: column;
  padding: 3%;
  margin: 0 2%;
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

function Posts(){
    const posts = [
        {
            name: "Karim Abouel Naga",
            text: `Hello this is a first post!`,
            file: 'https://fei-fan-production.s3.amazonaws.com/s3fs-public/styles/full_page_image/public/250122-friend-1.jpg?itok=0W5QyNM5',
        },
        {
            name: "Kevin Kindler",
            text: `Hello this is the second post!`,
            file: "http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcRPMKnq00NF_T7RusUNeLrSazRZM0S5O8_AOcw2iBTmYTxd3Q7uXf0sW41odpAKqSblKDMUMHGb8nZRo9g",
        },
        {
            name: "Kevin Kindler",
            text: `Hello this is the third post!`,
            file: "http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcRPMKnq00NF_T7RusUNeLrSazRZM0S5O8_AOcw2iBTmYTxd3Q7uXf0sW41odpAKqSblKDMUMHGb8nZRo9g",
        }
    ];

    return (
        <div className="posts-container">
            {posts.map((post) => (
                <div className="aroundAPost" style={{background: "transparent"}}>
                    <Post  post={post} />
                </div>
            ))}
        </div>
    );
}

// clickable icon to move to create post page
function CreatePost(){
    return (
        <div className="create-post">
            <a href="/posts">
                <ProfileOutlined className="create-post-icon" style={iconStyle} ProfileOutlined />
                <p className="create-post-text" style={iconStyle} >Posts</p>
            </a>
        </div>
    );
}

// clickable icon with text to move to Profile
function EditUser(){
    return (
        <div className="edit-profile">
            <a href="/profile">
                <UserOutlined className="edit-profile-icon"  style={iconStyle} UserOutlined/>
                <p className="edit-profile-text" style={iconStyle} >Profile</p>
            </a>
        </div>
    );
}
function Logout(){
    return (
        <div className="logout">
            <a href="/login">
                <LogoutOutlined className="edit-profile-icon"  style={iconStyle} LogoutOutlined/>
                <p className="logout-text" style={iconStyle} >Logout</p>
            </a>
        </div>
    );
}

const NewsFeed: React.FC = () => (
        <div className="news-feed" style={customStyle1}>
            <View style={{
                display: 'flex',
                flexDirection: 'row'
            }}>
                <Space>
                    <Logout />
                    <CreatePost />
                    <EditUser />
                </Space>
            </View>

            <Posts />

            {/* Your article components go here */}
        </div>
);

export default NewsFeed;
