import { Layout, Menu, Typography, Row, Col } from 'antd';
import { UserOutlined, AppstoreOutlined } from '@ant-design/icons';
import {
    Routes,
    Route,
    Link,
} from "react-router-dom";

//pages 
import StoreManagement from "./StoreManagement"
import AllStores from './AllStores'
import StoreProfile from './StoreProfile';
import Categories from "./Caregories"
import Products from "./Products"


import { useState } from 'react';


const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


function Main() {

    return (
        <Layout>

            <Header style={{ position: 'fixed', zIndex: 1, width: '100%', paddingLeft: '24px' }}>
                <Row style={{ height: "50px" }} justify="space-between" align="middle">
                    <Col >
                        <Typography.Text style={{ color: "white" }}>Store Management System</Typography.Text>
                    </Col>
                </Row>
            </Header>

            <Layout style={{ minHeight: '100vh' }}>
                <Sider width={200}
                    style={{
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        marginTop: 65
                    }}
                >
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        <Menu.Item key="1" icon={<UserOutlined />}><Link to="/">Store Management</Link></Menu.Item>
                        <Menu.Item key="2" icon={<AppstoreOutlined />}><Link to="/stores">Stores</Link></Menu.Item>

                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 10px 10px' }} style={{ marginLeft: 200, marginTop: 65 }}>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 10,
                            margin: 0,
                        }}
                    >
                        <Routes>
                            <Route path="/" element={<StoreManagement />} />
                            <Route path="store/:storeId" element={<StoreProfile />} >
                                <Route path="products/:categoryId" element={<Products />} />
                                <Route path="categories/:storeId" element={<Categories />} />
                            </Route>
                            <Route path="/stores" element={<AllStores />} />
                        </Routes>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
}

export default Main;
