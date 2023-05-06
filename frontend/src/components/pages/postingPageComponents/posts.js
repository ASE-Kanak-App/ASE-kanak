import React, { useState, useEffect } from 'react';
import '../../../App.css';
import styled from "styled-components";


import {Input,} from "antd";
import {api} from "../../../helpers/api";
import {DeleteFilled, DeleteOutlined, LikeFilled, LikeOutlined, UserOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {FaSignOutAlt} from "react-icons/fa";



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
export const Likes =styled.div`
display: inline-block;
width:60px;
height:60px;
 `;

const Post = ({ post: { name,title, text, file, comments, post_id, likes} }) => {
    const [newComment, setNewComment] = useState("");
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(likes);
    let [commentsToShow, setCommentsToShow] = useState(comments);
    const [username, setUsername] = useState("");

    useEffect(
        () => setCommentsToShow(comments),
        [comments]
    );
    useEffect(
        () => setLikesCount(likes),
        [likes]
    );

    console.log("post_id: " + post_id)
    console.log("likes: " + likes)
    const handleChange = (event) => {
        setNewComment(event.target.value);
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
    const Comment = ({ comment: { user_id, content } }) => {
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

    const like = () => {
        if (liked === false) {
            // check if the user has already liked the post

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

    const deletePost = () => {
        let config = {
            method: 'DELETE',
            maxBodyLength: Infinity,
            url: 'posts/deletePost/'+post_id,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        api.request(config)
            .then((response) => {
                alert("Post deleted successfully");
                window.location.reload();
            })
            .catch((error) => {
                alert("Something went wrong when deleting the post");
                console.log(error);
            });
    };

    return (
        <PostContainer>
            <Test>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <Title>{title}</Title>
                    <div>
                        <Link onClick={deletePost}><DeleteFilled style={{color: "black", borderColor: "green"}}/> deletePost</Link>
                    </div>

                </div>

                <Name>{"posted by " +name}</Name>
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

function Posts() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {

        // retrieve the Posts of the user
        let config = {
            method: 'GET',
            maxBodyLength: Infinity,
            url: 'posts/retrieveUserPosts/'+ localStorage.getItem("userId"),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        };
        console.log("config of retrieveUserPosts: " + JSON.stringify(config))
        api.request(config)
            .then((response) => {
                const responseDataOfRetrieveUserPosts = response.data;
                let newPosts = []
                console.log("retrieveUserPosts: " + JSON.stringify(responseDataOfRetrieveUserPosts))

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
                            console.log("commentsByPost: " + JSON.stringify(commentsByPost))



                            // get the link to the file
                            // add the post to the list of posts
                            newPosts = newPosts.concat({
                                post_id: responseDataOfRetrieveUserPosts[i].id,
                                title: responseDataOfRetrieveUserPosts[i].title,
                                name: localStorage.getItem("username"),
                                text: responseDataOfRetrieveUserPosts[i].content,
                                file: "http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcRPMKnq00NF_T7RusUNeLrSazRZM0S5O8_AOcw2iBTmYTxd3Q7uXf0sW41odpAKqSblKDMUMHGb8nZRo9g",
                                comments: commentsByPost,
                                likes: responseDataOfRetrieveUserPosts[i].likes,
                            })
                            // order newPosts by id
                            newPosts.sort(function(a, b) {
                                return a.post_id - b.post_id;
                            });
                            // reverse the order of newPosts
                            newPosts.reverse()
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
