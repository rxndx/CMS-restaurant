import React, { useState } from 'react';
import {Modal, Input, Form, Upload, Button, Select} from 'antd';
import {useDispatch} from "react-redux";
import {catalogMenuSlice} from "../../../../store/store";

const MenuCreationModal = ({ visible, onCancel, catalogs }) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);

    const handleFileChange = ({ fileList }) => {
        const newFileList = [...fileList.slice(-1)];
        setFileList(newFileList);
    };

    // TODO: нужно позже реализовать дополнительные проверки
    const onFinish = async () => {
        try {
            const values = await form.validateFields();
            const formData = new FormData();
            Object.keys(values).forEach(key => {
                formData.append(key, values[key]);
            });
            if (fileList.length > 0) {
                formData.append('menu_image', fileList[0].originFileObj);
            }
            const response = await fetch('http://localhost:8080/api/menu', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to create menu');
            }

            const responseData = await response.json();
            await dispatch(catalogMenuSlice.createItem({ id_menu: responseData.menu_id, id_catalog: values.menu_catalog_id }));

            onCancel();
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    // TODO: добавить больше защищающих правил для прогрузки
    return (
        <Modal
            title="Create New Menu"
            visible={visible}
            onCancel={onCancel}
            footer={null}
        >
            <Form
                form={form}
                onFinish={onFinish}
            >
                <Form.Item
                    label="Name"
                    name="menu_name"
                    rules={[{ required: true, message: 'Please input the name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="menu_content"
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item
                    label="Catalog"
                    name="menu_catalog_id"
                    rules={[{ required: true, message: 'Please select the catalog!' }]}
                >
                    <Select>
                        {catalogs.map(catalog => (
                            <Select.Option key={catalog.catalog_id} value={catalog.catalog_id}>
                                {catalog.catalogs_name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Upload Image"
                    name="menu_image"
                    rules={[{ required: true, message: 'Please input the image!' }]}
                >
                    <Upload
                        listType="picture"
                        fileList={fileList}
                        onChange={handleFileChange}
                        beforeUpload={() => false}
                    >
                        <Button>Click to Upload</Button>
                    </Upload>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Create
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default MenuCreationModal;