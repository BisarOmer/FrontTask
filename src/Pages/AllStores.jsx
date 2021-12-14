import React from 'react';
import { Table, Avatar, Form, Typography, Card, Tag } from 'antd';

import { useSelector } from 'react-redux'



function AllStores() {

    const allShops = useSelector((state) => state.shops.shops)

    const [form] = Form.useForm();

    const columns = [
        {
            title: 'Logo',
            dataIndex: 'logo',
            render: logo => {
                return (
             
                        <Avatar size="large" src={logo} />
                    
                )

            }
        },
        {
            title: 'Name',
            dataIndex: 'name',
            render: username => {
                return (              
                        <span style={{ marginLeft: "5px" }}>{username}</span>
                )

            }
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: status => {
                let color = status ? 'green' : 'volcano';
                return (
                    <Tag color={color} key={status}>
                        {status ? "Active" : "Disable"}
                    </Tag>
                );
            },
        },
    ];



    return (
        <>
            <Card>
                <Typography.Title level={4}>All Stores</Typography.Title>
                <Form form={form} component={false}>
                    <Table
                        bordered
                        dataSource={allShops}
                        columns={columns}
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: record => { console.log(record); }, // click row
                            };
                        }}
                    />
                </Form>
            </Card>

        </>
    );

}

export default AllStores;






