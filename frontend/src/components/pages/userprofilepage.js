import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import headerImage from "../images/header2.png";
import NavigationBar from "../../NavigationBar";
import PetProfile from "./petProfile";

const UserProfilePage = () => {
    const { id } = useParams(); // get id parameter from URL
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:5000/auth/GetUserDetail/${id}`) // use id parameter in API call
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id]);

    if (!user) {
        return (
            <div
                style={{
                    background: 'linear-gradient(' +
                        'to left,' +
                        ' #40B44B  75%,' +
                        ' #7BD37A 75%,' +
                        ' #7BD37A 0%)',
                    height: '100vh',
                    width: '100vw'
                }}>

                <div className="main-page">
                    <img src={headerImage} alt="My Image" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        height: '20vh',
                        textAlign: 'center',
                    }} />
                </div>

                <div style={{marginTop: '-5vh'}}>
                    <NavigationBar/>
                </div>

                <div style={{
                    position: 'absolute',
                    top: '40%',
                    marginLeft: '1vh',
                    transform: 'translateY(-50%)',
                    width: '400px',
                    padding: '20px',
                    border: '1px solid #ccc',
                    borderRadius: '10px',
                    background: "beige"
                }}>
                    <div>
                        <span style={{fontWeight: 'bold'}}>Username:</span> kevking
                    </div>
                    <div>
                        <span style={{fontWeight: 'bold'}}>First name:</span> Kevin
                    </div>
                    <div>
                        <span style={{fontWeight: 'bold'}}>Last name:</span> King
                    </div>
                    <div>
                        <span style={{fontWeight: 'bold'}}>Introduction:</span> Hey, my name is Kevin!
                    </div>
                </div>

                <div style={{marginTop: "5vh"}}>
                    <PetProfile/>
                </div>

            </div>
        );
    }

    return (
        <div>
            <h1>{user.username}</h1>
            <p>
                Name: {user.firstname} {user.lastname}
            </p>
            <p>Intro: {user.intro}</p>
        </div>
    );
};

export default UserProfilePage;
