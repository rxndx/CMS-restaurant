import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { Link } from 'react-router-dom';
import { UserOutlined, LoginOutlined } from '@ant-design/icons';

const { Header } = Layout;

const Navigation = () => {
    return (
        <Header>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{ flex: 1 }}>
                <Menu.Item key="1">
                    <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="/menu">Menu</Link>
                </Menu.Item>
                <Menu.Item key="5" style={{ float: 'right' }}>
                    <Button type="primary">
                        <Link to="/login"><UserOutlined /> Login</Link>
                    </Button>
                </Menu.Item>
                <Menu.Item key="6" style={{ float: 'right' }}>
                    <Button type="default">
                        <Link to="/register"><LoginOutlined /> Register</Link>
                    </Button>
                </Menu.Item>
            </Menu>
        </Header>
    );
};

export default Navigation;