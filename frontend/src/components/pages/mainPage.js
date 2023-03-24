import React from "react";
import NewsFeed from "./mainPageComponents/newsFeed";
import '../../App.css';
import headerImage from "../images/header2.png"
import { Space } from 'antd';
import {
    LogoutOutlined,
    ProfileOutlined,
} from '@ant-design/icons';
import styled from "styled-components";


const header = styled.div`
  height: ${props => props.height}px;
  background: ${props => props.background};
  display: flex;
  justify-content: center;
  align-items: center;
`;


const MainPage: React.FC = () => (

    <div style={{
        background: 'linear-gradient(' +
            ' #7BD37A 0%,' +
            ' #40B44B 100%)',
        height: '200vh',
        width: '200vh'
    }}>
        <div className="main-page">
            <Space>
                <LogoutOutlined />
                <ProfileOutlined />
            </Space>

            <img src={headerImage} alt="My Image" style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center',
                height: '100%',
                textAlign: 'center',
            }} />
            <div className="news-feed-container">
                <NewsFeed />
            </div>
            {/* Render other components and content here */}
        </div>
    </div>

);

export default MainPage;
