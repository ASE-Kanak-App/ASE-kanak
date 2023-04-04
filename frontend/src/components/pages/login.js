import React from 'react';
import {Button, Checkbox, Form, Input} from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import headerImage from '../images/Component 3.png'
import dogImage from '../images/Component 1.png'
import {useState} from "react";
import {api} from "../../helpers/api";
import User from "../models/User";




const FormContainer = styled.div`
    margin-left: 100vh;
    margin-top: -20vh;
    width: 425px;
    height: 243px;
`;

const onFinish = (values: any) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

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

    const [posts, setPosts] = useState([]);

    const handleChange = (event) => {
        let value = event.target.value;
        let name = event.target.name;

        setLoginData({
            ...LoginData,
            [name]: value
        })
    }

    const onlogin = async () => {
        try{
            const requestBody = JSON.stringify({
                email: LoginData.email,
                password: LoginData.password
            });
            console.log(requestBody);
            console.log("here2")
            const response = await api.post('/auth/login', {
                method: 'POST',
                body: requestBody
            });
            console.log("here1")
            const responseData = await response.json();
            console.log(responseData)
            console.log("here")
        } catch (e) {
            alert("something went wrong: " + e.message);
        }
    };

    const Login = async () => {
        try{
            const requestBody = JSON.stringify({
                email: LoginData.email,
                password: LoginData.password
            });
            console.log(requestBody);
            console.log("here2")
            const response = await fetch('http://127.0.0.1:5000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: requestBody
            });
            console.log("here1")
            const responseData = await response.json();
            console.log(responseData)
            console.log("here")
        } catch (e) {
            alert("something went wrong: " + e.message);
        }
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
                        <Button style={customStyle1} htmlType="submit" onClick={onlogin}>
                            <Link to={"/MainPage"}>
                            </Link>
                            Sign In
                        </Button>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button style={customStyle2} htmlType="submit" >
                            <Link to="/register">
                            </Link>
                                Sign Up
                        </Button>
                    </Form.Item>

                </Form>
            </FormContainer>
        </div>
    )
}

export default Login;
