import React from 'react';
import { Layout, Row, Col, Carousel, Card } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { EnvironmentOutlined, ClockCircleOutlined, PhoneOutlined } from '@ant-design/icons';
import Navigation from "../../../components/Navigation";
import Footer from "../../../components/Footer";

const { Meta } = Card;

const Template2 = () => {
    return (
        <Layout className="layout">
            <Content style={{ padding: '0 50px' }}>
                <div className="site-layout-content">
                    <Carousel autoplay>
                        <div>
                            <img alt="carousel1" src="https://via.placeholder.com/800x400" style={{ width: '100%' }} />
                        </div>
                        <div>
                            <img alt="carousel2" src="https://via.placeholder.com/800x400" style={{ width: '100%' }} />
                        </div>
                        <div>
                            <img alt="carousel3" src="https://via.placeholder.com/800x400" style={{ width: '100%' }} />
                        </div>
                    </Carousel>
                    <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
                        <Col span={12}>
                            <Card title="Welcome to Our Restaurant">
                                <p>
                                    Experience the finest dining with a variety of dishes from around
                                    the world. Our chefs use the freshest ingredients to prepare
                                    meals that will tantalize your taste buds.
                                </p>
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card title="Our Location">
                                <p>
                                    <EnvironmentOutlined /> 123 Main St, City, Country
                                </p>
                                <p>
                                    <ClockCircleOutlined /> Mon-Fri: 10am - 10pm
                                </p>
                                <p>
                                    <PhoneOutlined /> (123) 456-7890
                                </p>
                            </Card>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
                        <Col span={8}>
                            <Card
                                hoverable
                                cover={<img alt="dish1" src="https://via.placeholder.com/300x200" />}
                            >
                                <Meta title="Dish Name" description="Delicious and tasty" />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card
                                hoverable
                                cover={<img alt="dish2" src="https://via.placeholder.com/300x200" />}
                            >
                                <Meta title="Dish Name" description="Mouth-watering flavors" />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card
                                hoverable
                                cover={<img alt="dish3" src="https://via.placeholder.com/300x200" />}
                            >
                                <Meta title="Dish Name" description="A delightful treat" />
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Content>
        </Layout>
    );
};

export default Template2;