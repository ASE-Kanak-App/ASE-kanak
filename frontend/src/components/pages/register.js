import React, {useState} from 'react';
import {Button, Checkbox, Form, Input} from 'antd';
import styled from 'styled-components'
import headerImage from '../images/Component 3.png'
import { Link } from 'react-router-dom';
import dogImage from '../images/Component 1.png'
import catImage from '../images/Component 2.png'
import FormData from "form-data";
import {api} from "../../helpers/api";
import {User} from "../models/User";

const FormContainer = styled.div`
    margin-right: 10vh;
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



const Register: React.FC = () => {

    let [RegistrationData, setRegistrationData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
        eMail: '',
        phoneNumber: '',
        introduction: ''
    })

    const handleChange = (event) => {
        const { name, value } = event.target

        setRegistrationData({
            ...RegistrationData,
            [name]: value
        })
    }
    function handleConfirmPassword() {
        if (RegistrationData.password !== RegistrationData.confirmPassword) {
            return Promise.reject('Passwords do not match!');
        } else {
            return Promise.resolve();
        }
    }

    const onRegister = async () => {
        const FormData = require('form-data');
        let data = new FormData();
        data.append('username', RegistrationData.username);
        data.append('firstName', RegistrationData.firstName);
        data.append('lastName', RegistrationData.lastName);
        data.append('password', RegistrationData.password);
        data.append('confirmPassword', RegistrationData.confirmPassword);
        data.append('eMail', RegistrationData.eMail);
        data.append('phoneNumber', RegistrationData.phoneNumber);
        data.append('role', RegistrationData.introduction);

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:5000/auth/login',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data : data
        };

        api.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                const user = new User(response.data);
                user.setEmail(LoginData.email);
                localStorage.setItem('user', JSON.stringify(user));
                console.log("new user: "+localStorage.getItem('user'));

                // move to main page
                window.location.href = "/MainPage";
            })
            .catch((error) => {
                alert("Wrong email or password, please try again")
                console.log(error);
            });
    };

    return(
        <div style={{
            background: 'linear-gradient(' +
                'to left,' +
                ' #40B44B  40%,' +
                ' #7BD37A 40%,' +
                ' #7BD37A 0%)',
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
            marginLeft: '120vh'
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
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input onChange={handleChange} name='username'/>
                    </Form.Item>
                    <Form.Item
                        label="First Name"
                        name="firstName"
                        rules={[{ required: true, message: 'Please input your First Name!' }]}
                    >
                        <Input onChange={handleChange} name='firstName'/>
                    </Form.Item>
                    <Form.Item
                        label="Last Name"
                        name="lastName"
                        rules={[{ required: true, message: 'Please input your Last Name!' }]}
                    >
                        <Input onChange={handleChange} name='lastName'/>
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ min:5, required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password onChange={handleChange} name='password'/>
                    </Form.Item>
                    <Form.Item
                        label="Confirm Password"
                        name="confirmPassword"
                        /*check if password and confirm password are the same*/
                        rules={[{ required: true, message: 'Please input your password!', validator: handleConfirmPassword }]}
                    >
                        <Input.Password onChange={handleChange} name='confirmPassword'/>
                    </Form.Item>
                    <Form.Item
                        label="eMail"
                        name="eMail"
                        rules={[{ required: true, message: 'Please input your eMail!' }]}
                    >
                        <Input onChange={handleChange} name='eMail'/>
                    </Form.Item>
                    <Form.Item
                        label="Phone Number"
                        name="phoneNumber"
                        rules={[{ required: true, message: 'Please input your Phone Number!' }]}
                    >
                        <Input onChange={handleChange} name='phoneNumber'/>
                    </Form.Item>
                    <Form.Item
                        label="Introduction"
                        name="introduction"
                        rules={[{ min: 8, required: true, message: 'Please input an introduction!' }]}
                    >
                        <Input onChange={handleChange} name='introduction'/>
                    </Form.Item>


                    {/*<Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>*/}

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button style={customStyle2} htmlType="submit" onClick={onRegister}>
                            Sign Up
                        </Button>
                    </Form.Item>
                </Form>
            </FormContainer>
        </div>
    )
}

export default Register;
