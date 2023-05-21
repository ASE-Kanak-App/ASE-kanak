import React, {useState} from "react";
import {Button, Input, message, Upload} from 'antd';
import { InboxOutlined, PlusOutlined } from '@ant-design/icons';
import styled from "styled-components";
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import {string} from "prop-types";
import {createPostInProfile} from "./posts";
import FormData from "form-data";
import {api} from "../../../helpers/api";
import {User} from "../../models/User";
const { Dragger } = Upload;

const { TextArea } = Input;



export const PostContainer = styled.div`
  font-size: 1.5em;
  text-align: left;
  background: 'linear-gradient(' +
            ' #7BD37A 0%,' +
            ' #40B44B 100%)';
  display: flex;
  flex-direction: column;
  padding: 3%;
  margin: 0 2%;
`;

export const Test =styled.div`
  background: #D7ADAD;
  font-size: 15px;
  line-height: 24px;
  display: flex;
  flex-direction: column;
  padding: 3%;
  margin: 0 2%;
 `;

const customStyle1 = {
    backgroundColor: 'transparent',
    padding: '10px',
    border: "none",
}



const CreatePost: React.FC = () => {

    let [postData, setPostData] = useState({
        title: '',
        content: '',
        files: null
    });

    const FormData = require('form-data');
    let data = new FormData();

    const [file, setFile] = useState();

    const [filedata, setFiledata] = useState();

    function handleFileChange(e) {
        let value = e.target.value;
        let name = e.target.name;
        let file = URL.createObjectURL(e.target.files[0]);
        let filedata = e.target.files[0];
        console.log("e.target.files[0]", e.target.files[0])
        console.log(value)
        console.log(name)
        console.log(file)
        setFile(file);
        setFiledata(filedata);
        setPostData({
            ...postData,
            [name]: value
        })
    }


    function handleChange(e) {
        let value = e.target.value;
        let name = e.target.name;
        console.log(value)
        console.log(name)
        setPostData({
            ...postData,
            [name]: value
        })
    }

    const createPost = async () => {
        data.append('title', postData.title);
        data.append('content', postData.content);
        data.append('user_id', localStorage.getItem("userId"));
        data.append('file', filedata);
        console.log("data", data)
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'posts/createPost/',
            headers: {
                'content-type': 'multipart/form-data'
            },
            data : data
        };

        api.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                const responseData = response.data;
                // rerender the page
                window.location.reload();
            })
            .catch((error) => {
                alert("Error in creating post")
                console.log(error);
                console.log("the problem is near line 117")
            })

    };

    const hiddenFileInput = React.useRef(null);

    const handleClick = () => {
        hiddenFileInput.current.click();
    };


    return(
        <PostContainer>
        <div className="news-feed" style={customStyle1}>
        <div className="posts-container">
        <div className="aroundAPost" style={{background: "transparent"}}>
        <PostContainer>
            <Test>
                <div className="title" style={{
                    'font-size': '1.5em',
                    'text-align': 'left',
                    'background':'#D7ADAD',
                    'display': 'flex',
                    'flex-direction': 'column',
                    'padding': '3%',
                    'margin': '0 2%'}}>
                    <Input placeholder = "Title" onChange={handleChange} name='title' />
                </div>

                <div className="content" style={{
                    'background': '#D7ADAD',
                    'display': 'flex',
                    'flex-direction': 'column',
                    'padding': '3%',
                    'margin': '0 2%',
                    'border':'0'}}>
                        <TextArea
                            showCount
                            maxLength={100}
                            style={{ height: 120, marginBottom: 24 }}
                            onChange={handleChange}
                            name="content"
                            placeholder="What's on your mind?"
                        />
                    {/* Your article components go here */}
                </div>

                <div className="image" style={{
                    'background': '#D7ADAD',
                    'display': 'flex',
                    'flex-direction': 'column',
                    'padding': '3%',
                    'margin': '0 2%',
                    'border':'0',
                    'align-items':'centre'}}>
                    <div className={'upload-image'} style={{
                        'font-size': '1.5em',
                        'text-align': 'left',
                        'background':'#D7ADAD',
                        'display': 'flex',
                        'flex-direction': 'column',
                        'padding': '3%',
                        'margin': '0 2%'}}>
                        <Button onClick={handleClick}>
                            Choose Image
                        </Button>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            name="files"
                            ref={hiddenFileInput}
                            style={{'display': 'none'}}
                            />
                        <img className="image" src={file} alt="" />
                    </div>
                </div>

                <div className="submit" style={{
                    'background': '#D7ADAD',
                    'display': 'flex',
                    'flex-direction': 'column',
                    'padding': '3%',
                    'margin': '0 2%',
                    'border':'0',
                    'align-items':'centre'}}>
                    <button onClick={() => createPost(postData)}>Submit</button>
                </div>
            </Test>
        </PostContainer>
        </div>
        </div>
        </div>
        </PostContainer>
    )
};

export default CreatePost;
