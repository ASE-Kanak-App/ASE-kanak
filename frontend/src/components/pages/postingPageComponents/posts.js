import React, { useState, useEffect } from 'react';
import '../../../App.css';
import styled from "styled-components";


import {View} from "react-native";
import {Space} from "antd";
import getUserId from "./GetUserID";


const customStyle1 = {
    backgroundColor: 'transparent',
    padding: '10px',
    border: "none",
}



export const PostContainer = styled.div`
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

export const Text =styled.div`
  background: #D7ADAD;
  font-family: 'Akshar';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
 `;

export const Title =styled.div`
  background: #D7ADAD;
  font-family: 'Akshar';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 24px;
`;
export const Test =styled.div`
  background: #D7ADAD;
  font-size: 15px;
  line-height: 24px;
  display: flex;
  flex-direction: column;
  padding: 3%;
  margin: 0 2%;
 `;

const Post = ({ post: { name,title, text, file } }) => {
    return (
        <PostContainer>
            <Test>
                <Heading>{title}</Heading>
                <Title>{"posted by: " +name}</Title>
                <Text>{text}</Text>
                <img className="image" src={file} alt="" />
            </Test>
        </PostContainer>
    );
};

const posts = [
    {
        name: localStorage.getItem("username"),
        title: "Title",
        text: `Hello this is a first post!`,
        file: 'https://fei-fan-production.s3.amazonaws.com/s3fs-public/styles/full_page_image/public/250122-friend-1.jpg?itok=0W5QyNM5',
    },
    {
        name: localStorage.getItem("username"),
        title: "Title",
        text: `Hello this is the second post!`,
        file: "http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcRPMKnq00NF_T7RusUNeLrSazRZM0S5O8_AOcw2iBTmYTxd3Q7uXf0sW41odpAKqSblKDMUMHGb8nZRo9g",
    },
    {
        name: localStorage.getItem("username"),
        title: "Title",
        text: `Hello this is the third post!`,
        file: "http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcRPMKnq00NF_T7RusUNeLrSazRZM0S5O8_AOcw2iBTmYTxd3Q7uXf0sW41odpAKqSblKDMUMHGb8nZRo9g",
    }
];

// function to create a post
// input: title, text, image if any
// add it to the posts array
export function createPostInProfile(name, title, text, image){
    console.log("here1")
    //add post to posts
    posts.push({
        name: name,
        title: title,
        text: text,
        file: image,
    })
    console.log("here")
    console.log(posts)
    //reload Posts

}

function Posts() {
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


const PostsFeed: React.FC = () => (
    <PostContainer>
        <div className="news-feed" style={customStyle1}>


            <Posts />

            {/* Your article components go here */}
        </div>
    </PostContainer>
);

export default PostsFeed;
