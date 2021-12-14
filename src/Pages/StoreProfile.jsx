import React, { useEffect, useState } from 'react';
import { Card, Col, Typography, Row, Avatar, } from 'antd';
import { UserOutlined, PhoneOutlined, CompassOutlined, } from "@ant-design/icons";

import {
    Outlet,
    useParams,
    useNavigate
} from "react-router-dom";

import { useSelector } from 'react-redux'


function StoreProfile() {

    let params = useParams();
    let navigate = useNavigate();

    const allShops = useSelector((state) => state.shops.shops)
    const [storeDetail, setStoreDetail] = useState()


    useEffect(() => {
        let foundStore = allShops.find(store => store.id == params.storeId)
        setStoreDetail(foundStore)
        navigate('categories/' + params.storeId)
    }, [])

    return (
        <>
            <Card>
                <Typography.Title level={4}>Profile</Typography.Title>
                <Row justify="start" style={{ margin: "1% 0%" }}>
                    <Row gutter={10}>
                        <Col>
                            <Avatar size={55} icon={<UserOutlined />} src={storeDetail?.logo} />

                        </Col>
                        <Col>
                            <Typography.Title level={5}>{storeDetail?.name}</Typography.Title>
                            <Row gutter={16} justify="center" >
                                <Col> <PhoneOutlined /> <Typography.Text level={5}>{storeDetail?.address}</Typography.Text></Col>
                                <Col><CompassOutlined /> <Typography.Text level={5}>{storeDetail?.phone}</Typography.Text></Col>
                            </Row>
                        </Col>
                    </Row>
                </Row>
            </Card>

            <Outlet />


        </>
    );
}

export default StoreProfile;