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
import NavigationBar from '../../NavigationBar';

const iconStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
    textAlign: 'center',
    color: 'black',
    fontSize: '20px',
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
                height: '50vh',
                textAlign: 'center',
            }} />
        </div>

        <div style={{marginTop: '-15vh'}}>
            <NavigationBar/>
        </div>

        <div className="create-post" style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "transparent",
            marginTop: '5vh'
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

    </div>



);

export default PostingPage;
