import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Space, Form, Input, Select, Typography, Row, Modal, Avatar, Upload, message } from 'antd';
import { TagOutlined, LoadingOutlined, PlusOutlined, PictureOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
//redux
import { useSelector, useDispatch } from 'react-redux'
import { addCategory } from '../Reducers/categorySlice'

import { useParams, useNavigate } from "react-router-dom";

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function ViewStore() {

    let params = useParams();
    let navigate = useNavigate();
    const dispatch = useDispatch()

    const allShops = useSelector((state) => state.shops.shops)
    const allCategories = useSelector((state) => state.categories.categories)

    const categoryAttributes = {
        id: '',
        storeId: params.storeId,
        image: 'https://play-lh.googleusercontent.com/384jx3OL4_tqtCGZrfIB6Q5TehM0Q7TLYFsenRPfeT8f-3vicWH2BYbvaEAneaPFMMM',
        name: '',
    };

    //states
    const [loading, setLoading] = useState();
    const [imageUrl, setImageUrl] = useState();
    const [categoryInfo, setCategoryInfo] = useState(categoryAttributes)
    const [cateogries, setCategories] = useState()

    useEffect(() => {
        let findCategoryByStore = allCategories.filter(category => category.storeId == params.storeId)
        setCategories(findCategoryByStore)
    }, [])


    const [form] = Form.useForm();
    //modal
    const [isModalVisible, setIsModalVisible] = useState(false);

    // handle add product function
    const onFinish = (values) => {
        message.success('Successfully Added');
        setIsModalVisible(false);
        categoryInfo.id = Math.floor(Math.random() * 100)
        dispatch(addCategory(categoryInfo))
        setCategories([...cateogries, categoryInfo])
    };


    const handleChangePhoto = info => {
        if (info.file.status === 'uploading') {
            setLoading(true)
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => {
                setImageUrl(imageUrl)
                setLoading(false)
            }
            );
        }
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    //modal
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        categoryInfo.id = Math.floor(Math.random() * 100)
        dispatch(addCategory(categoryInfo))
        setCategories([...cateogries, categoryInfo])
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    return (
        <>
            <Card style={{ margin: "10px 0px 10px 0px" }}>
                <Row justify="space-between">
                    <Typography.Title level={4}>Categories</Typography.Title>
                    <Button type="primary" onClick={showModal} icon={<TagOutlined />}>
                        Add Category
                    </Button>
                </Row>
            </Card >

            <Card>
                <Row gutter={[24, 16]}>
                    {cateogries?.map(item => {
                        return (
                            <Col span={6} key={item.id}>

                                <Card
                                    onClick={() => { navigate("../products/" + item.id, { state: item.name }) }}
                                    hoverable
                                    style={{ width: 240 }}
                                    cover={<img alt="example" src={item.image} />}
                                >
                                    <Card.Meta title={item.name} />
                                </Card>

                            </Col>
                        )
                    })}

                </Row>
            </Card>


            <Modal title="Add Category" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    // <Button key="submit" type="primary" onClick={handleOk} >
                    //     Add
                    // </Button>
                ]}
            >
                <Space direction="vertical" style={{ width: "100%" }}>
                    {/* <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        onChange={handleChangePhoto}
                    >
                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload> */}
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        autoComplete="off"
                    >

                        <Typography.Text>category's photo </Typography.Text>
                        <Form.Item
                            name="photo"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="category's name" onChange={e => setCategoryInfo({ ...categoryInfo, image: e.target.value })} prefix={<PictureOutlined />} />
                        </Form.Item>

                        <Typography.Text>category's name </Typography.Text>
                        <Form.Item
                            name="name"
                            rules={[{ required: true }]}
                        >

                            <Input placeholder="category's name" onChange={e => setCategoryInfo({ ...categoryInfo, name: e.target.value })} prefix={<TagOutlined />} />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Add
                            </Button>
                        </Form.Item>

                    </Form>

                </Space>
            </Modal>

        </>
    );
}

export default ViewStore;