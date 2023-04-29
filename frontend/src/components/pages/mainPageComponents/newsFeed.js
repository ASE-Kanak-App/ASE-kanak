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
import NavigationBar from '../../../NavigationBar';
import {api} from "../../../helpers/api";

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

const Title = styled.div`
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

const Text =styled.div`
  background: #D7ADAD;
  font-family: 'Akshar';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
`;

export const Name =styled.div`
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

const Post = ({ post: { title, name, text, file } }) => {

    return (
        <PostContainer>
            <Test>
                <Title>{title}</Title>
                <Name>{"posted by " + name}</Name>
                <Text>{text}</Text>
                <img className="image" src={file} alt="" />
            </Test>
        </PostContainer>
    );
};




function Posts(){
    const [posts, setPosts] = useState([]);
        useEffect(() => {

            // get all posts
            let config = {
                method: 'GET',
                maxBodyLength: Infinity,
                url: 'posts/retrievePost/',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            };
            api.request(config)
                .then((response) => {
                    const responseDataOfRetrievePost = response.data;
                    let newPosts = []

                    //iterate over retrievedPosts and add them to list posts
                    for (let i = 0; i < responseDataOfRetrievePost.length; i++) {
                        // for every post, get the username of the user who posted it
                        let config = {
                            method: 'GET',
                            maxBodyLength: Infinity,
                            url: 'auth/getUserName/',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                            params: {
                                user_id: responseDataOfRetrievePost[i].user_id
                            },
                        };
                        api.request(config)
                            .then((response) => {
                                console.log(JSON.stringify(response.data));
                                const responseDataOfGetUsername = response.data;
                                // get the link to the file



                                // add the post to the list of posts
                                newPosts = newPosts.concat({
                                    id: responseDataOfRetrievePost[i].id,
                                    title: responseDataOfRetrievePost[i].title,
                                    name: responseDataOfGetUsername.username,
                                    text: responseDataOfRetrievePost[i].content,
                                    file: "http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcRPMKnq00NF_T7RusUNeLrSazRZM0S5O8_AOcw2iBTmYTxd3Q7uXf0sW41odpAKqSblKDMUMHGb8nZRo9g",
                                })
                                setPosts(newPosts)

                            })
                            .catch((error) => {
                                alert("Something went wrong when getting the username")
                                console.log(error);
                            });

                    }

                })
                .catch((error) => {
                    alert("Something went wrong when getting the posts");
                    console.log(error);
                });
        }, []);

            return (
                console.log("posts in return: ", posts),
                    <div className="posts-container">
                        {posts.map((post) => (
                            <div className="aroundAPost" key={post.id} style={{background: "transparent"}}>
                                <Post post={post}/>
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

            <div style={{marginTop: '-15vh', marginLeft: '2.5vh'}}>
                <NavigationBar/>
            </div>

            <div style={{marginTop: '10vh'}}>
                <Posts />
            </div>


            {/* Your article components go here */}
        </div>
);

export default NewsFeed;
