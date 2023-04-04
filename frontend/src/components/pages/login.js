import React from 'react';
import {Button, Checkbox, Form, Input} from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import headerImage from '../images/Component 3.png'
import dogImage from '../images/Component 1.png'
import {useState} from "react";
import User from "../models/User";


const FormContainer = styled.div`
    margin-left: 100vh;
    margin-top: -20vh;
    width: 425px;
    height: 243px;
`;

const customStyle1 = {
    backgroundColor: '#ffaeae',
    borderColor: '#ffaeae',
    color: '#000000',
}

const customStyle2 = {
    backgroundColor: 'rgb(220,255,205)',
    borderColor: '#dcffcd',
    color: '#000000',
}


const Login: React.FC = () => {

    let [LoginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (event) => {
        let value = event.target.value;
        let name = event.target.name;

        setLoginData({
            ...LoginData,
            [name]: value
        })
    }

    const onLogin = async () => {
        const requestBody = JSON.stringify({
            email: LoginData.email,
            password: LoginData.password
        });
        console.log(requestBody);
        const response = await fetch('http://127.0.0.1:5000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: requestBody
        });
        console.log(response.data);
        const user = new User(response);
        console.log(user);

        localStorage.setItem('token', user.token);
        localStorage.setItem('user', JSON.stringify(user));

    };



    return(
    <div style={{
        background: 'linear-gradient(' +
            'to right,' +
            ' #7BD37A 0%,' +
            ' #7BD37A 40%,' +
            ' #40B44B 40%)',
        height: '100vh',
        width: '100vw'
    }}>

        <div style={{
            display: 'flex',
            marginLeft: '35vh',
            alignItems: 'flex-start'
        }}>
            <img src={headerImage} alt="My Image" style={{ marginTop: '20px' }} />
        </div>

        <div style={{
            marginTop: '5vh',
            width: '333px',
            height:'418px'
        }}>
            <img src={dogImage} alt="Dog Image" style={{ marginLeft: '15vh'}} />
        </div>


            <FormContainer>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="eMail"
                        name="email"
                        rules={[{required: true, message: 'Please input your eMail!' }]}
                    >
                        <Input onChange={handleChange} name='email'/>
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password onChange={handleChange} name='password'/>
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button style={customStyle1} htmlType="submit" onClick={onLogin} >
                            <Link to={'/mainPage'}>
                                Sign In
                            </Link>
                        </Button>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button style={customStyle2} htmlType="submit" >
                            <Link to="/register">
                                Sign Up
                            </Link>
                        </Button>
                    </Form.Item>

                </Form>
            </FormContainer>
        </div>
    )
}

export default Login;
