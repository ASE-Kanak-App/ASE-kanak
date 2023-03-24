import React from "react";
import NewsFeed from "./mainPageComponents/newsFeed";
import '../../App.css';


const MainPage: React.FC = () => (

    <div style={{
        background: 'linear-gradient(' +
            'to right,' +
            ' #7BD37A 0%,' +
            ' #40B44B 100%)',
        height: '100vh',
        width: '100vw'
    }}>
        <div className="main-page">
            <h1 className='special-heading'>PETBOOK</h1>
            <div className="news-feed-container">
                <NewsFeed />
            </div>
            {/* Render other components and content here */}
        </div>
    </div>

);

export default MainPage;
