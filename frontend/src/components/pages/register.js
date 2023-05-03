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
        email: '',
        phone: '',
        intro: ''
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
        data.append('firstname', RegistrationData.firstName);
        data.append('lastname', RegistrationData.lastName);
        data.append('password', RegistrationData.password);
        data.append('email', RegistrationData.email);
        data.append('phone', RegistrationData.phone);
        data.append('intro', RegistrationData.intro);

        console.log("data "+data);

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'auth/signup',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data : data
        };

        api.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                alert("You have successfully registered!")

                // login after registration
                let config = {
                    method: 'POST',
                    maxBodyLength: Infinity,
                    url: 'auth/login',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: {
                        email: RegistrationData.email,
                        password: RegistrationData.password
                    },
                };
                api.request(config)
                    .then((response) => {
                        const responseData = response.data;
                        localStorage.setItem('email', RegistrationData.email);
                        localStorage.setItem('token', JSON.stringify(responseData.token));

                        // get user id
                        let config = {
                            method: 'GET',
                            maxBodyLength: Infinity,
                            url: 'auth/getUserId/',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                            params: {
                                email: RegistrationData.email
                            }
                        };
                        api.request(config)
                            .then((response) => {
                                const responseData = response.data;
                                localStorage.setItem('userId', responseData.id);
                                localStorage.setItem('username', responseData.username);
                                console.log("userId in localStorage", localStorage.getItem("userId"))
                                console.log("email in localStorage", localStorage.getItem("email"))
                                console.log("token in localStorage", localStorage.getItem("token"))
                                console.log("username in localStorage", localStorage.getItem("username"))

                                // move to main page
                                window.location.href = "/mainPage";
                            })
                            .catch((error) => {
                                alert("Something went wrong while getting the user id in Registration.")
                                console.log(error);
                            });
                    })
                    .catch((error) => {
                        alert("Wrong email or password in Registration")
                        console.log(error);

                    });
            })
            .catch((error) => {
                alert("Registration failed!")
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
            alignItems: 'flex-start',
            position:'absolute'
        }}>
            <img src={headerImage} alt="My Image" style={{ marginTop: '20px' }} />
        </div>

        <div style={{
            marginTop: '30vh',
            marginLeft: '120vh',
            position:'absolute'
        }}>
            <img src={dogImage} alt="Dog Image" style={{ marginLeft: '15vh'}} />
        </div>

        <div style={{marginTop:'50vh', position:'absolute'}}>
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
                        <Input onChange={handleChange} name='firstname'/>
                    </Form.Item>
                    <Form.Item
                        label="Last Name"
                        name="lastName"
                        rules={[{ required: true, message: 'Please input your Last Name!' }]}
                    >
                        <Input onChange={handleChange} name='lastname'/>
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
                        <Input onChange={handleChange} name='email'/>
                    </Form.Item>
                    <Form.Item
                        label="Phone Number"
                        name="phoneNumber"
                        rules={[{ required: true, message: 'Please input your Phone Number!' }]}
                    >
                        <Input onChange={handleChange} name='phone'/>
                    </Form.Item>
                    <Form.Item
                        label="Introduction"
                        name="introduction"
                        rules={[{ min: 8, required: true, message: 'Please input an introduction!' }]}
                    >
                        <Input onChange={handleChange} name='intro'/>
                    </Form.Item>


                    {/*<Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>*/}

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button style={customStyle2} htmlType="submit" onClick={onRegister}>
                            Sign Up
                        </Button>
                        Or <a href="/login">login now!</a>
                    </Form.Item>
                </Form>
            </FormContainer>
        </div>



        </div>
    )
}

export default Register;
