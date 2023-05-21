import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../../App.css';

const FollowedList = () => {
    const id = localStorage.getItem('userId');
    const [followers, setFollowers] = useState([]);

    useEffect(() => {
        const fetchFollowers = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/auth/getFollowers/${id}`);
                const data = await response.json();
                console.log("I got the followers", data);

                const followedIds = data.map((follower) => follower.followed_id);
                const followersWithUsernames = await Promise.all(
                    followedIds.map(async (followedId) => {
                        const usernameResponse = await fetch(`http://127.0.0.1:5000/auth/getUserName/?userId=${followedId}`);
                        const usernameData = await usernameResponse.json();
                        return {
                            followed_id: followedId,
                            username: usernameData.username
                        };
                    })
                );

                setFollowers(followersWithUsernames);
            } catch (error) {
                console.error('Error fetching followers:', error);
            }
        };

        fetchFollowers();
    }, [id]);

    return (
        <div className="followed-list-container">
            <h2>WOOF WOOF</h2>
            {followers && followers.length > 0 ? (
                <ul className="followed-list">
                    {followers.map((follower) => (
                        <li className="followed-list-item" key={follower.followed_id}>
                            <span className="followed-list-item-icon">&#x1F436;</span> {follower.username}
                            <button className="followed-list-item-button">Visit</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>You don't seem to follow anybody!</p>
            )}
        </div>
    );
};

export default FollowedList;
