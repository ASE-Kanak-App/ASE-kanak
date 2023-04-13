import React, {useState} from "react";
import { Input, message, Upload } from 'antd';
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



const PostContainer = styled.div`
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



const CreatePost: React.FC = () => {

    let [postData, setPostData] = useState({
        title: '',
        content: '',
        files: null
    });

    const [file, setFile] = useState();

    function handleChange(e) {
        let file = URL.createObjectURL(e.target.files[0]);
        let value = e.target.value;
        let name = e.target.name;

        setFile(file);

        setPostData({
            ...postData,
            [name]: value
        })
    }

    const createPost = async () => {
        createPostInProfile(postData.title, postData.content, file)
        console.log(postData);

    };


    return(
        <PostContainer>
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

                        <input type="file"
                               onChange={handleChange}
                               name="files"
                        />
                        <img src={file}/>
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

        </PostContainer>
    )
};

export default CreatePost;