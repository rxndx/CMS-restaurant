import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const AppFooter = () => {
    return (
        <Footer style={{ textAlign: 'center' }}>
            <p>©2024 Created by CMSRestaurant</p>
            <p>Address: 123 Main St, Odessa, Ukraine</p>
            <p>Phone: +380 (44) 555 55 55</p>
            <p>Email: info@example.com</p>
            <p>Follow Us: <a href="https://instagram.com/CMSrestaurant" target="_blank" rel="noopener noreferrer">Instagram</a>, <a href="https://facebook.com/CMSrestaurant" target="_blank" rel="noopener noreferrer">Facebook</a></p>
        </Footer>
    );
};

export default AppFooter;