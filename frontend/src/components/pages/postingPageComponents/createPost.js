import React, {useState} from "react";
import { Input, message, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import styled from "styled-components";
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import {string} from "prop-types";

const { TextArea } = Input;
const onChange = (e) => {
    console.log('Change:', e.target.value);
};



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

function getBase64(img: RcFile, callback: (imageUrl: string) => void) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(string(reader.result)));
    reader.readAsDataURL(img);
}
const CreatePost: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const handleChange = (info: UploadChangeParam<UploadFile<any>>) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (imageUrl) => {
                setImageUrl(imageUrl);
                setLoading(false);
            });
        }
    };


    const beforeUpload = (file: RcFile) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    return(
        <PostContainer>
            <div className="news-feed" style={{
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
                        onChange={onChange}
                        placeholder="What's on your mind?"
                    />
                {/* Your article components go here */}
            </div>
            <div className="news-feed" style={{
                'background': '#D7ADAD',
                'display': 'flex',
                'flex-direction': 'column',
                'padding': '3%',
                'margin': '0 2%',
                'border':'0',
                'align-items':'centre'}}>
                <div className={'upload-image'} style={{ 'align-items':'centre','background': 'white', 'height': 120}}>
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                    >
                        {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
                    </Upload>
                </div>

            </div>

        </PostContainer>
    )
};

export default CreatePost;