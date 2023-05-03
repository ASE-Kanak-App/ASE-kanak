import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaPlus, FaSignOutAlt } from 'react-icons/fa';
import './App.css';
import {api} from "./helpers/api";

const logout = () => {
    console.log("logging out");
    var form = new FormData();
    let token = localStorage.getItem('token');
    token = token.replace(/['"]+/g, '');
    let header = 'Bearer '+ token;
    let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: 'auth/logout',
        headers: {
            'Authorization': header,
        },
        processData: false,
        mimeType: "multipart/form-data",
        contentType: false,
        data: form
    };

    console.log("config, " + JSON.stringify(config));

    api.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            const responseData = response.data;
            localStorage.removeItem('email');
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('username');
            console.log("local storage cleared");
            console.log("local storage items:" + localStorage.getItem('email') + " " + localStorage.getItem('token') + " " + localStorage.getItem('userId') + " " + localStorage.getItem('username'));
            window.location.href = '/';
        })
        .catch((error) => {
            alert("Error logging out")
            console.log(error);
        });
};

function NavigationBar() {
    return (
        <nav>
            <ul className="navbar">
                <li><Link to="/mainpage"><FaHome /> Home</Link></li>
                <li><Link to="/profile"><FaUser /> Profile</Link></li>
                <li><Link to="/posts"><FaPlus /> Post</Link></li>
                <li><FaSignOutAlt onClick={logout}/> Logout</li>
            </ul>
        </nav>
    );
}

export default NavigationBar;
