import React from "react";
import PostsFeed from "./postingPageComponents/posts";
import '../../App.css';
import headerImage from "../images/header2.png"
import { Space } from 'antd';
import {View} from "react-native";
import {ProfileOutlined,
    LogoutOutlined,
    UserOutlined,
} from '@ant-design/icons';
import CreatePost from "./postingPageComponents/createPost";


const iconStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
    textAlign: 'center',
    color: 'black',
    fontSize: '20px',
}

function MainPage(){
    return (
        <div className="create-post">
            <a href="/mainPage">
                <ProfileOutlined className="main-page-icon" style={iconStyle} ProfileOutlined />
                <p className="main-page-text" style={iconStyle} >Main Page</p>
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





const PostingPage: React.FC = () => (

    <div style={{
        background: 'linear-gradient(' +
            ' #7BD37A 0%,' +
            ' #40B44B 100%)',
    }}>
        <div className="main-page">
            <img src={headerImage} alt="My Image" style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center',
                height: '100%',
                textAlign: 'center',
            }} />
            <div className="main-page-icons" style={{
                width: '75%',
            }}>
                <Space size="large">
                    <MainPage />
                    <EditUser />
                    <Logout />
                </Space>
            </div>
        </div>
        <div className="create-post" style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "transparent"
        }}>
                <CreatePost />

        </div>
        <div className="post-feed" style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "transparent",
        }}>
                <PostsFeed />
            </div>




            {/* Render other components and content here */}
    </div>



);

export default PostingPage;