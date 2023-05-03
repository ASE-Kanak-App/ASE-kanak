import React from "react";
import NewsFeed from "./mainPageComponents/newsFeed";
import '../../App.css';
import headerImage from "../images/header2.png"


const MainPage: React.FC = () => {


    return (
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
            <div className="news-feed-container">
                <NewsFeed />
            </div>
            {/* Render other components and content here */}
        </div>
    </div>
        );

}

export default MainPage;
