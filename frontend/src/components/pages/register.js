import React from 'react';
import {Button, Checkbox, Form, Input} from 'antd';
import styled from 'styled-components'
import headerImage from '../images/Component 3.png'
import dogImage from '../images/Component 1.png'
import catImage from '../images/Component 2.png'

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

const Register: React.FC = () => (


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
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button style={customStyle2} htmlType="submit">
                            Sign Up
                        </Button>
                    </Form.Item>


                </Form>
            </FormContainer>
        </div>
);

export default Register;
