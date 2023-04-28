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
        const [posts, setPosts] = useState([]);
        let config = {
            method: 'GET',
            maxBodyLength: Infinity,
            url: 'posts/retrievePost/',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        };

        useEffect(() => {
            api.request(config)
                .then((response) => {
                    const responseData = response.data;
                    console.log(responseData.length)
                    let newPosts = []
                    //iterate over retrievedPosts and add to posts
                    for (let i = 0; i < responseData.length; i++) {
                        //show the image received in format image.jpg
                        //posts.push(responseData[i].image)
                        var headers = response.headers;
                        var blob = new Blob([responseData[i].image], {type: headers['content-type']});
                        var link = document.createElement('a');
                        link.href = window.URL.createObjectURL(blob);
                        link.download = responseData[i].image;
                        console.log("imageUrl: ", link)

                        newPosts = newPosts.concat({
                            id: i,
                            name: responseData[i].title,
                            text: responseData[i].content,
                            file: link,
                        })
                    }
                    setPosts(newPosts)
                    console.log("retrievedPosts: ", JSON.stringify(responseData))
                    console.log("posts: ", posts)

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
