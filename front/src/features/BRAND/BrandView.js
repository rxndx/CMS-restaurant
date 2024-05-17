import React, { useEffect, useState } from 'react';
import { Layout, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import dynamicImport from '../../utils/dynamicImport';
import { brandSlice } from "../../store/store";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TemplateEditor from "./components/TemplateEditor";
import { Content } from "antd/es/layout/layout";

const BrandView = () => {
    const { brandName } = useParams();
    const dispatch = useDispatch();
    const brands = useSelector(state => state.brand.list);

    const [loading, setLoading] = useState(true);
    const [TemplateComponent, setTemplateComponent] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        dispatch(brandSlice.fetchItems()).then(() => setLoading(false));
    }, [dispatch]);

    useEffect(() => {
        const currentBrand = brands.find(brand => brand.brand_name === brandName);
        if (currentBrand) {
            const templatePath = currentBrand.file_path;
            dynamicImport(templatePath)
                .then(module => {
                    const template = module.default;
                    if (typeof template === 'function') {
                        setTemplateComponent(() => template);
                    } else {
                        console.error('Template is not a function:', template);
                    }
                })
                .catch(error => {
                    console.error('Ошибка загрузки шаблона:', error);
                });
        }
    }, [brands, brandName]);

    const saveChanges = (blocks) => {
        const promises = blocks.map(block => {
            return new Promise((resolve, reject) => {
                resolve();
            });
        });

        Promise.all(promises)
            .then(() => {
                console.log('Изменения сохранены');
            })
            .catch(error => {
                console.error('Ошибка сохранения изменений:', error);
            });
    };

    return (
        <Spin spinning={loading} tip="Loading...">
            <Layout className="layout">
                <Content>
                    <DndProvider backend={HTML5Backend}>
                        {TemplateComponent && (
                            isEditing ? (
                                <TemplateEditor template={TemplateComponent} saveChanges={saveChanges} />
                            ) : (
                                <TemplateComponent />
                            )
                        )}
                    </DndProvider>
                    <button onClick={() => setIsEditing(!isEditing)}>
                        {isEditing ? 'Завершить редактирование' : 'Редактировать'}
                    </button>
                </Content>
            </Layout>
        </Spin>
    );
};

export default BrandView;