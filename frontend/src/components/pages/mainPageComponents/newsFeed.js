import React, { useState, useEffect } from 'react';
import '../../../App.css';
import styled from "styled-components";

const customStyle1 = {
    backgroundColor: 'transparent',
    padding: '10px',
    border: "none",
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

// Mock Newsfeed depends on the API to come
function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}



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

const NewsFeed: React.FC = () => (
        <div className="news-feed" style={customStyle1}>

            <Posts />
            {/* Your article components go here */}
        </div>
);

export default NewsFeed;
