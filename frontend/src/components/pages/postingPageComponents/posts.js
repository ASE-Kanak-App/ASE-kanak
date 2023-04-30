import React, { useState, useEffect } from 'react';
import '../../../App.css';
import styled from "styled-components";


import {View} from "react-native";
import {Input, Space} from "antd";
import getUserId from "./GetUserID";
import {api} from "../../../helpers/api";


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

export const Title = styled.div`
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

export const Name =styled.div`
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

const Post = ({ post: { name,title, text, file, comments, post_id } }) => {
    const [newComment, setNewComment] = useState("");
    const handleChange = (event) => {
        setNewComment(event.target.value);
        console.log("new comment: " + newComment);
        console.log("post_id: " + post_id);
        console.log("user_id: " + localStorage.getItem("userId"));
    };
    const createNewComment = () => {
        // create new comment
        let config = {
            method: 'POST',
            maxBodyLength: Infinity,
            url: 'posts/makeComment/',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
                post_id: post_id,
                content: newComment,
                user_id: localStorage.getItem("userId"),
            },
        };
        console.log(config)
        api.request(config)
            .then((response) => {
                alert("Comment created successfully");
                window.location.reload();

            })
            .catch((error) => {
                alert("Something went wrong when creating the comment");
                console.log(error);
            });
    };
    const Comment = ({ comment: { user_id, content } }) => {
        const [username, setUsername] = useState("");
        // get the username of the user who posted the comment
        let responseDataOfGetUsername
        let config = {
            method: 'GET',
            maxBodyLength: Infinity,
            url: 'auth/getUserName/',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params: {
                user_id: user_id
            },
        };
        api.request(config)
            .then((response) => {
                responseDataOfGetUsername = response.data;
                setUsername(responseDataOfGetUsername.username)
            })
            .catch((error) => {
                alert("Something went wrong when getting the username of the user who posted the comment");
                console.log(error);
            });

        return (
            <div>
                <div style={{background: "transparent", height: "10px"}}></div>
                <Test>
                    <Name>{"Commented by " + username}</Name>
                    <Text>{content}</Text>
                </Test>
            </div>

        );
    };

    return (
        <PostContainer>
            <Test>
                <Title>{title}</Title>
                <Name>{"posted by " +name}</Name>
                <Text>{text}</Text>
                <img className="image" src={file} alt="" />
            </Test>
            {comments.map((comment) => (
                <Comment comment={comment}/>

            ))}
            <div style={{background: "transparent", height: "10px"}}></div>
            <div className="title" style={{
                'font-size': '1.5em',
                'text-align': 'left',
                'background':'#D7ADAD',
                'display': 'flex',
                'flex-direction': 'column',
                'padding': '1%',
                'margin': '0 2%'}}>
                <Input placeholder = "Write a comment"  onChange={handleChange} name='newComment' />
            </div>
            <div className="submit" style={{
                'background': '#D7ADAD',
                'display': 'flex',
                'justify-content': 'right',
                'flex-direction': 'column',
                'margin': '0% 2%',
                'padding': '1%',
                'border':'0'}}>
                <button onClick={createNewComment}>Submit</button>
            </div>
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
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        console.log("userId", localStorage.getItem("userId"))

        // retrieve the Posts of the user
        let config = {
            method: 'GET',
            maxBodyLength: Infinity,
            url: 'posts/retrieveUserPosts/'+ localStorage.getItem("userId"),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        };
        api.request(config)
            .then((response) => {
                const responseDataOfRetrieveUserPosts = response.data;
                let newPosts = []

                //iterate over retrievedPosts and add them to list posts
                for (let i = 0; i < responseDataOfRetrieveUserPosts.length; i++) {
                    let config = {
                        method: 'GET',
                        maxBodyLength: Infinity,
                        url: 'posts/getCommentByPost/' + responseDataOfRetrieveUserPosts[i].id,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                    };
                    api.request(config)
                        .then((response) => {
                            const commentsByPost = response.data;



                            // get the link to the file
                            // add the post to the list of posts
                            newPosts = newPosts.concat({
                                post_id: responseDataOfRetrieveUserPosts[i].id,
                                title: responseDataOfRetrieveUserPosts[i].title,
                                name: localStorage.getItem("username"),
                                text: responseDataOfRetrieveUserPosts[i].content,
                                file: "http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcRPMKnq00NF_T7RusUNeLrSazRZM0S5O8_AOcw2iBTmYTxd3Q7uXf0sW41odpAKqSblKDMUMHGb8nZRo9g",
                                comments: commentsByPost
                            })
                            newPosts.sort(function(a, b) {
                                return a.id - b.id;
                            });
                            setPosts(newPosts)
                        })
                        .catch((error) => {
                            alert("Something went wrong when getting the comments")
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


const PostsFeed: React.FC = () => (
    <PostContainer>
        <div className="news-feed" style={customStyle1}>


            <Posts />

            {/* Your article components go here */}
        </div>
    </PostContainer>
);

export default PostsFeed;
