import React from 'react';
import { Layout, Breadcrumb, Row, Col, Card } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { EnvironmentOutlined, ClockCircleOutlined, PhoneOutlined } from '@ant-design/icons';
import Navigation from "../../../components/Navigation";
import Footer from "../../../components/Footer";

const { Meta } = Card;

const Template1 = () => {
    return (
        <Layout className="layout">
            <Navigation />
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-content">
                    <Row gutter={[16, 16]}>
                        <Col span={8}>
                            <Card
                                hoverable
                                cover={<img alt="restaurant" src="https://via.placeholder.com/300x200" />}
                            >
                                <Meta title="Restaurant Name" description="123 Main St, City, Country" />
                            </Card>
                        </Col>
                        <Col span={16}>
                            <Card title="About Us">
                                <p>
                                    Welcome to our restaurant! We offer a variety of delicious dishes
                                    made with fresh ingredients. Our atmosphere is perfect for a
                                    casual meal with friends or a romantic dinner.
                                </p>
                                <Row gutter={16}>
                                    <Col span={8}>
                                        <Card>
                                            <EnvironmentOutlined /> 123 Main St, City, Country
                                        </Card>
                                    </Col>
                                    <Col span={8}>
                                        <Card>
                                            <ClockCircleOutlined /> Mon-Fri: 10am - 10pm
                                        </Card>
                                    </Col>
                                    <Col span={8}>
                                        <Card>
                                            <PhoneOutlined /> (123) 456-7890
                                        </Card>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Content>
            <Footer />
        </Layout>
    );
};

export default Template1;