import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Space, Tag, Input, Typography, Row, Modal, Upload, message, Form } from 'antd';
import { TagOutlined, DollarOutlined, LoadingOutlined, PlusOutlined, AppstoreAddOutlined, PictureOutlined, FolderOutlined } from "@ant-design/icons";

import { useParams, useLocation } from "react-router-dom";

//redux
import { useSelector, useDispatch } from 'react-redux'
import { addProduct } from '../Reducers/productSlice'



function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}


function Products() {

    let params = useParams();
    let { state } = useLocation();
    const dispatch = useDispatch()

    const allProducts = useSelector((state) => state.products.products)

    const ProductAttributes = {
        id: '',
        categoryId: params.categoryId,
        //default
        image: 'https://www.arraymedical.com/wp-content/uploads/2018/12/product-image-placeholder.jpg',
        name: '',
        price: ""
    };
    const [loading, setLoading] = useState();
    const [imageUrl, setImageUrl] = useState();
    const [product, setProduct] = useState(ProductAttributes)
    const [products, setProducts] = useState([])

    const [form] = Form.useForm();

    useEffect(() => {
        let findProductByCategory = allProducts.filter(product => product.categoryId === params.categoryId)
        setProducts(findProductByCategory)
    }, [])

    //modal
    const [isModalVisible, setIsModalVisible] = useState(false);

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
        product.id = Math.floor(Math.random() * 100)
        setProducts([...products, product])
        dispatch(addProduct(product))
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // handle add product function
    const onFinish = () => {
        message.success('Successfully Added');
        setIsModalVisible(false);
        setProduct({ ...product, id: Math.floor(Math.random() * 100) })
        setProducts([...products, product])
        dispatch(addProduct(product))
        setProduct(ProductAttributes)
        form.resetFields()
    };

    return (
        <>

            <Card style={{ margin: "10px 0px 10px 0px" }}>
                <Row justify="space-between">
                    <Typography.Title level={4}>Products</Typography.Title>
                    <Button type="primary" onClick={showModal} icon={<TagOutlined />}>
                        Add Product
                    </Button>
                </Row>
            </Card >

            <Card>
                <Tag color="processing" style={{ marginBottom: "10px" }}>
                    <Typography.Text style={{ padding: "5px", fontSize: "16px" }}>{state + " Category"}</Typography.Text>
                </Tag>

                <Row gutter={[24, 16]}>
                    {products ? products?.map(product => {
                        return (
                            <Col span={6} key={product.id}>
                                <Card
                                    hoverable
                                    style={{ width: 240 }}
                                    cover={<img alt="example" src={product.image} style={{minHeight:"250px",maxHeight:"250px",objectFit:"cover"}} />}
                                >
                                    <Card.Meta title={product.name} />
                                    <Space size={10}>
                                        $
                                        <Typography.Text>{product.price}</Typography.Text>
                                    </Space>
                                </Card>
                            </Col>
                        )
                    })
                        :
                        <Row justify='center' align='center'>
                            <Space direction="vertical" style={{ width: "100%" }}>
                                <FolderOutlined />
                                <Typography.Title level={4}>Empty</Typography.Title>
                                <Typography.Text >Add product you will see theme here</Typography.Text>
                            </Space>
                        </Row>
                    }

                </Row>
            </Card>

            <Modal title="Add Product" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
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
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        autoComplete="off"
                    >

                        <Typography.Text>Photo</Typography.Text>
                        <Form.Item
                            name="photo"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="Photo's link" prefix={<PictureOutlined />} onChange={e => setProduct({ ...product, image: e.target.value })} />
                        </Form.Item>

                        <Typography.Text>Name</Typography.Text>
                        <Form.Item
                            name="name"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="Name" prefix={<AppstoreAddOutlined />} onChange={e => setProduct({ ...product, name: e.target.value })} />
                        </Form.Item>

                        <Typography.Text>Price</Typography.Text>
                        <Form.Item
                            name="price"
                            rules={[{ required: true }]}
                        >
                            <Input type='number' placeholder="Price" prefix={<DollarOutlined />} onChange={e => setProduct({ ...product, price: e.target.value })} />
                        </Form.Item>

                        <Form.Item
                        >
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

export default Products;