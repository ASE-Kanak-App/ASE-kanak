import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaPlus, FaSignOutAlt } from 'react-icons/fa';
import './App.css';
import styled from "styled-components";
import { api } from './helpers/api';

const logout = () => {
    console.log('logging out');
    var form = new FormData();
    let token = localStorage.getItem('token');
    token = token.replace(/['"]+/g, '');
    let header = 'Bearer ' + token;
    let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: 'auth/logout',
        headers: {
            Authorization: header,
        },
        processData: false,
        mimeType: 'multipart/form-data',
        contentType: false,
        data: form,
    };

    console.log('config, ' + JSON.stringify(config));

    api
        .request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            const responseData = response.data;
            localStorage.removeItem('email');
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('username');

            window.location.href = '/';
        })
        .catch((error) => {
            alert('Error logging out');
            console.log(error);
        });
};


const Navbar = styled.nav`
  background-color: beige;
  border-radius: 10px;
  max-width: 500px; 
  margin: 0 auto; 
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #333;
  font-weight: bold;
  font-size: 16px;
  padding: 10px;

  svg {
    margin-right: 5px;
  }
`;


const NavItem = styled.li`
  margin: 0 10px;
`;


const NavList = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
`;


function NavigationBar() {
    return (
        <Navbar>
            <NavList>
                <NavItem>
                    <NavLink to="/mainpage">
                        <FaHome />
                        Home
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/profile">
                        <FaUser />
                        Profile
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/posts">
                        <FaPlus />
                        Post
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink onClick={logout}>
                        <FaSignOutAlt />
                        Logout
                    </NavLink>
                </NavItem>
            </NavList>
        </Navbar>
    );
}

export default NavigationBar;
