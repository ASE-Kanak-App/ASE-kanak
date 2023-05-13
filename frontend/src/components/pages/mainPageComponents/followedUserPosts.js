import React, { useState, useEffect } from 'react';

function Post(props) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Fetch posts from API
        fetch(`/api/followed_users_posts/${props.userId}`)
            .then(response => response.json())
            .then(data => setPosts(data));
    }, [props.userId]);

    return (
        <div>
            {posts.map(post => (
                <div key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                    <p>Posted by: {post.user.username}</p>
                </div>
            ))}
        </div>
    );
}

export default Post;
