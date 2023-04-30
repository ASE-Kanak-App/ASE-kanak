import React, { useState, useEffect } from 'react';
import '../../../App.css';
import styled from "styled-components";
import {
    ProfileOutlined,
    LogoutOutlined,
    UserOutlined, LikeFilled, LikeOutlined,
} from '@ant-design/icons';
import {View} from "react-native";
import {Input, Space} from "antd";
import NavigationBar from '../../../NavigationBar';
import {api} from "../../../helpers/api";
import {Likes} from "../postingPageComponents/posts";

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

const Post = ({ post: { title, name, text, file, comments, post_id, likes} }) => {
    const [newComment, setNewComment] = useState("");
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(likes);
    const [seed, setSeed] = useState("");
    const [commentsToShow, setCommentsToShow] = useState(comments);
    const reset = () => {
        setSeed(Math.random() * 5000);
    }

    const handleChange = (event) => {
        setNewComment(event.target.value);
        console.log("new comment: " + newComment);
        console.log("post_id: " + post_id);
        console.log("user_id: " + localStorage.getItem("userId"));
    };
    const createNewComment = () => {
        // create new comment
        setSeed(Math.random() * 5000);
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
                setCommentsToShow([...commentsToShow, response.data]);

            })
            .catch((error) => {
                alert("Something went wrong when creating the comment");
                console.log(error);
            });
    };

    const like = () => {
        if (liked === false) {
            likePost();
        } else {
            unlikePost();
        }
    };

    const likePost = () => {
        // if liked == false, like the post
        // if liked == true, unlike the post

        let config = {
            method: 'POST',
            maxBodyLength: Infinity,
            url: 'posts/likePost/'+post_id,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        api.request(config)
            .then((response) => {
                alert("Liked successfully");
                setLiked(true);
                setLikesCount(likesCount + 1)
                console.log("liked: " + liked)

            })
            .catch((error) => {
                alert("Something went wrong when creating the comment");
                console.log(error);
            });
    };

    const unlikePost = () => {
        let config = {
            method: 'POST',
            maxBodyLength: Infinity,
            url: 'posts/unlikePost/'+post_id,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        api.request(config)
            .then((response) => {
                setLiked(false);
                setLikesCount(likesCount - 1)
                console.log("liked: " + liked)

            })
            .catch((error) => {
                alert("Something went wrong when creating the comment");
                console.log(error);
            });
    };

    return (
        <PostContainer >
            <Test>
                <Title>{title}</Title>
                <Name>{"posted by " + name}</Name>
                <Text>{text}</Text>
                <img className="image" src={file} alt="" />
            </Test>
            <div className="likesAndDislikes" style={{
                'text-align': 'left',
                'background':'#D7ADAD',
                'display': 'flex',
                'flex-direction': 'column',
                'padding': '0.5%',
                'margin': '0 2%'}}>
                <div className="likesAndDislikes" style={{
                    'display': 'flex',
                    'flex-direction': 'row',
                    'justify-content': 'flex-end',
                    'padding': '1%',
                    'margin': '0 2%',
                    'font-size': '0.8em'}}>
                    <Likes>{likesCount}</Likes>
                    {liked ? (
                        <LikeFilled onClick={like} style={{color: "#b8ebb8", borderColor: "green"}}/>
                    ) : (
                        <LikeOutlined onClick={like} style={{color: "#b8ebb8", borderColor: "green"}}/>
                    )}
                </div>
            </div>
            {commentsToShow.map((comment) => (
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
                                const responseDataOfGetUsername = response.data;
                                let config = {
                                    method: 'GET',
                                    maxBodyLength: Infinity,
                                    url: 'posts/getCommentByPost/' + responseDataOfRetrievePost[i].id,
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
                                            post_id: responseDataOfRetrievePost[i].id,
                                            title: responseDataOfRetrievePost[i].title,
                                            name: responseDataOfGetUsername.username,
                                            text: responseDataOfRetrievePost[i].content,
                                            file: "http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcRPMKnq00NF_T7RusUNeLrSazRZM0S5O8_AOcw2iBTmYTxd3Q7uXf0sW41odpAKqSblKDMUMHGb8nZRo9g",
                                            comments: commentsByPost,
                                            likes: responseDataOfRetrievePost[i].likes,

                                        })
                                        // order newPosts by id
                                        newPosts.sort(function(a, b) {
                                            return a.id - b.id;
                                        });
                                        setPosts(newPosts)
                                    })
                                    .catch((error) => {
                                        alert("Something went wrong when getting the comments")
                                        console.log(error);
                                    });
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
