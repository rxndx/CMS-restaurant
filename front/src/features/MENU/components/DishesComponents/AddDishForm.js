import React, {useState} from 'react';
import {Form, Input, Button, Upload} from 'antd';
import {foodSlice} from "../../../../store/store";
import {useDispatch} from "react-redux";

const AddDishForm = ({menuId, updateDishesList}) => {
    const dispatch = useDispatch();

    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);

    const handleFileChange = ({ fileList }) => {
        const newFileList = [...fileList.slice(-1)];
        setFileList(newFileList);
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            const formData = new FormData();
            Object.keys(values).forEach(key => {
                formData.append(key, values[key]);
            });
            if (menuId) {
                formData.append('id_menu', menuId);
            }
            if (fileList.length > 0) {
                formData.append('menu_image', fileList[0].originFileObj);
            }
            const response = await fetch('http://localhost:8080/api/dish', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to create dish');
            }
            const newDish = await response.json();
            updateDishesList(prevList => [...prevList, newDish]);

            form.resetFields();
            await dispatch(foodSlice.fetchItems());
            setFileList([]);
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    // TODO: добавить больше проверок
    return (
        <Form form={form}>
            <Form.Item name="menu_item_name" label="Dish Name" rules={[{required: true}]}>
                <Input/>
            </Form.Item>
            <Form.Item name="menu_item_content" label="Description" rules={[{required: true}]}>
                <Input.TextArea/>
            </Form.Item>
            <Form.Item name="price" label="Price" rules={[{required: true}]}>
                <Input prefix="$"/>
            </Form.Item>
            <Form.Item name="menu_image" label="Image" rules={[{required: true}]}>
                <Upload
                    listType="picture"
                    fileList={fileList}
                    onChange={handleFileChange}
                    beforeUpload={() => false}>
                    <Button>Upload</Button>
                </Upload>
            </Form.Item>
            <Form.Item>
                <Button type="primary" onClick={handleSubmit}>
                    Add Dish
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddDishForm;