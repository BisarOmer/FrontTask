import React, { useState } from 'react';
import { Input, Form, Typography, Card, Row, Modal, Button, Space, Col, Switch, message, Popconfirm } from 'antd';
import { UserOutlined, PictureOutlined, PhoneOutlined, CompassOutlined, LoadingOutlined, PlusOutlined, FolderOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
//redux
import { useSelector, useDispatch } from 'react-redux'
import { addShop, deleteShop } from '../Reducers/shopSlice'


function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function StoreManagement() {

    let navigate = useNavigate();

    const allShops = useSelector((state) => state.shops.shops)
    const dispatch = useDispatch()

    const storeAttributes = {
        id: '',
        //default logo
        logo: 'https://cdn.logo.com/hotlink-ok/logo-social.png',
        name: '',
        address: '',
        phone: '',
        status: true,
    };

    const [storeInfo, setStoreInfo] = useState(storeAttributes)
    const [loading, setLoading] = useState();
    const [imageUrl, setImageUrl] = useState();
    //modal
    const [isModalVisible, setIsModalVisible] = useState(false);

    //image upload btn have not been using
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    //switch acount active
    function onChange(checked) {
        setStoreInfo({ ...storeInfo, status: checked })
    }

    //modal
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        storeInfo.id = Math.floor(Math.random() * 100)
        dispatch(addShop(storeInfo));
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file) {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => {
                setImageUrl(imageUrl);
                setLoading(false);
            }
            );
        }
    };

    const [form] = Form.useForm();

    const onFinish = () => {
        message.success('Successfully Added');
        setIsModalVisible(false);
        storeInfo.id = Math.floor(Math.random() * 100)
        dispatch(addShop(storeInfo));
        form.resetFields()
    };

    function confirm(id) {
        message.error('Deleted');
        dispatch(deleteShop(id))

    }

    return (
        <>
            <Card>
                <Row justify="space-between">
                    <Typography.Title level={4}>Store Management</Typography.Title>
                    <Button type="primary" onClick={showModal} icon={<UserOutlined />}>
                        Add Store
                    </Button>
                </Row>
                <Row gutter={[24, 16]}>
                    {allShops.length ? allShops.map(store => {
                        return <Col span={6} key={store.id}>

                            <Card
                                hoverable
                                style={{ width: "100%" }}
                                cover={<img alt="example" src={store.logo} onClick={() => { navigate("store/" + store.id) }} />}
                                actions={[
                                    <Popconfirm placement="top" title="There is no way to back" onConfirm={() => confirm(store.id)} okText="Yes" cancelText="No">
                                        <DeleteOutlined />
                                    </Popconfirm>
                                    ,
                                ]}
                            >
                                <Card.Meta title={store.name} />
                                <Row style={{ marginTop: "10px" }}>
                                    <Space size={10}>
                                        <CompassOutlined />
                                        <Typography.Text>{store.address}</Typography.Text>
                                    </Space>
                                </Row>
                                <Row>
                                    <Space size={10}>
                                        <PhoneOutlined />
                                        <Typography.Text >{store.phone}</Typography.Text>
                                    </Space>
                                </Row>
                            </Card>
                        </Col>
                    })
                        :
                        <>
                            <Row justify='center' align='center'>
                                <Space direction="vertical" style={{ width: "100%" }}>
                                    <FolderOutlined />
                                    <Typography.Title level={4}>Empty</Typography.Title>
                                    <Typography.Text >Add store you will see theme here</Typography.Text>
                                </Space>
                            </Row>

                        </>

                    }

                </Row>
            </Card>

            <Modal title="Add Store" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
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
                    {/* in case of image uploading */}
                    {/* <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        onChange={handleChange}
                    >
                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload> */}
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Typography.Text>Logo </Typography.Text>
                        <Form.Item
                            name="logo"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="Logo's link" onChange={e => setStoreInfo({ ...storeInfo, logo: e.target.value })} prefix={<PictureOutlined />} />
                        </Form.Item>

                        <Typography.Text>store's name </Typography.Text>
                        <Form.Item
                            name="name"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="store's name" onChange={e => setStoreInfo({ ...storeInfo, name: e.target.value })} prefix={<UserOutlined />} />
                        </Form.Item>

                        <Typography.Text>address</Typography.Text>
                        <Form.Item
                            name="address"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="address" onChange={e => setStoreInfo({ ...storeInfo, address: e.target.value })} prefix={<CompassOutlined />} />
                        </Form.Item>

                        <Typography.Text>phone number</Typography.Text>
                        <Form.Item
                            name="phone"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="phone number" type="tel" onChange={e => setStoreInfo({ ...storeInfo, phone: e.target.value })} prefix={<PhoneOutlined />} />
                        </Form.Item>

                        <Form.Item>
                            <Typography.Text>status</Typography.Text> <br />
                            <Switch defaultChecked onChange={onChange} />
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

export default StoreManagement;






