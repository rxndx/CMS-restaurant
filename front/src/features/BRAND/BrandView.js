// TODO: тут будет содержаться персональная страничка бренда, которая оформлена непосредственно по заданному шаблону

import React, { useEffect, useState } from 'react';
import { Layout, Breadcrumb, Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import dynamicImport from '../../utils/dynamicImport';
import { brandSlice } from "../../store/store";

const BrandView = () => {
    const { brandName } = useParams();
    const dispatch = useDispatch();
    const brands = useSelector(state => state.brand.list);
    const [TemplateComponent, setTemplateComponent] = useState(null);

    useEffect(() => {
        dispatch(brandSlice.fetchItems());
    }, [dispatch]);

    useEffect(() => {
        const currentBrand = brands.find(brand => brand.brand_name === brandName);
        if (currentBrand) {
            const templatePath = currentBrand.file_path;
            dynamicImport(templatePath)
                .then(module => {
                    setTemplateComponent(() => module.default);
                })
                .catch(error => {
                    console.error('Ошибка загрузки шаблона:', error);
                });
        }
    }, [brands, brandName]);

    if (!TemplateComponent) {
        return <div>Loading...</div>;
    }

    return (
        <Layout className="layout">
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-content">
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <TemplateComponent />
                    </Col>
                </Row>
            </div>
        </Layout>
    );
};

export default BrandView;