import React from 'react';
import '../../../App.css';


const FollowedList = () => {
    return (
        <div className="followed-list-container">
            <h2>WOOF WOOF</h2>
            <ul className="followed-list">
                <li className="followed-list-item">
                    <span className="followed-list-item-icon">&#x1F436;</span> DogLover123
                    <button className="followed-list-item-button">Visit</button>
                </li>
                <li className="followed-list-item">
                    <span className="followed-list-item-icon">&#x1F98A;</span> PandaFanatic
                    <button className="followed-list-item-button">Visit</button>
                </li>
                <li className="followed-list-item">
                    <span className="followed-list-item-icon">&#x1F438;</span> CatWhisperer
                    <button className="followed-list-item-button">Visit</button>
                </li>
                <li className="followed-list-item">
                    <span className="followed-list-item-icon">&#x1F41F;</span> KoalaEnthusiast
                    <button className="followed-list-item-button">Visit</button>
                </li>
                <li className="followed-list-item">
                    <span className="followed-list-item-icon">&#x1F436;</span> PoodleLover
                    <button className="followed-list-item-button">Visit</button>
                </li>
            </ul>
        </div>
    );
};

export default FollowedList;
