
import React, { Component, createRef } from "react";
import { Modal, Button, message } from "antd";
import axios from "axios";
import { PostForm } from "./PostForm";
import { BASE_URL, TOKEN_KEY } from "../constants";

class CreatePostButton extends Component {
    state = {
        visible: false,
        confirmLoading: false
    };

    showModal = () => {
        this.setState({
            visible: true
        });
    };

    handleOk = () => {
        this.setState({
            confirmLoading: true
        });

        // get form data 像後端去發送請求
        this.postForm
            .validateFields()
            .then((form) => {
                const { description, uploadPost } = form;
                const { type, originFileObj } = uploadPost[0];
                console.log("File type: ", type);
                const postType = type.match(/^(image|video)/g)[0]; //g 代表全局
                if (postType) {
                    let formData = new FormData();
                    formData.append("message", description);
                    formData.append("media_file", originFileObj);

                    const opt = {
                        method: "POST",
                        url: `${BASE_URL}/upload`,
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`
                        },
                        data: formData
                    };

                    this.setState({ confirmLoading: true });
                    axios(opt)
                        .then((res) => {
                            if (res.status === 200) {
                                //inform user uploading is done
                                message.success("The image/video is uploaded!");
                                //reset form fields
                                this.postForm.resetFields();
                                //close modal
                                this.handleCancel();
                                //inform home to refresh current tab
                                this.props.onShowPost(postType);
                                //set confirmloading false
                                this.setState({ confirmLoading: false });
                            }
                        })
                        .catch((err) => {
                            console.log("Upload image/video failed: ", err.message);
                            message.error("Failed to upload image/video!");
                            this.setState({ confirmLoading: false });
                        });
                }
            })
            .catch((err) => {
                console.log("err ir validate form -> ", err);
            });
    };

    handleCancel = () => {
        console.log("Clicked cancel button");
        this.setState({
            visible: false
        });
    };

    render() {
        const { visible, confirmLoading } = this.state;
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    Create New Post
                </Button>
                <Modal
                    title="Create New Post"
                    visible={visible}
                    onOk={this.handleOk}
                    okText="Create"
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                >
                    <PostForm ref={(refInstance) => (this.postForm = refInstance)} />
                </Modal>
            </div>
        );
    }
}

export default CreatePostButton;

