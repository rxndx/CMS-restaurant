import React, { useState } from 'react';
import { Modal, List, Button, Card, Divider } from 'antd';
import { Link } from 'react-router-dom';
import AddDishForm from './AddDishForm';
import {useDispatch} from "react-redux";
import {foodSlice} from "../../../../store/store";

const DishesModal = ({ menuId, dishes, closeModal }) => {
    const dispatch = useDispatch();
    const [isAdding, setIsAdding] = useState(false);
    const [dishesList, setDishesList] = useState(dishes);
    const menuDishes = dishes.filter(dish => dish.id_menu === menuId);

    const handleDeleteDish = async (dishId) => {
        try {
            await dispatch(foodSlice.deleteItem(dishId)).then(r=> dispatch(foodSlice.fetchItems()));
        } catch (error) {
            console.error('Error deleting dish:', error.message);
        }
    };

    return (
        <Modal
            title="List of Dishes"
            visible={true}
            onCancel={closeModal}
            footer={null}
        >
            <Button onClick={() => setIsAdding(true)}>Add New Dish</Button>
            {isAdding && <AddDishForm menuId={menuId} updateDishesList={setDishesList} />}
            {menuDishes.length === 0 ? (
                <p>No dishes</p>
            ) : (
                <List
                    dataSource={menuDishes}
                    renderItem={(item) => (
                        <List.Item>
                            <Card
                                title={item.menu_item_name}
                                style={{ width: '100%' }}
                                extra={
                                    <Button onClick={() => handleDeleteDish(item.menu_item_id)} danger>
                                        Delete
                                    </Button>
                                }
                            >
                                <div>
                                    <img
                                        alt={item.menu_item_name}
                                        src={item.menu_item_image_path}
                                        style={{ width: '60%', height: 'auto' }}
                                    />
                                </div>
                                <p>{item.menu_item_content}</p>
                                <Divider />
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div>Price: {item.price}</div>
                                    <Link to={`/menu/${menuId}/${item.menu_item_id}/${item.menu_item_name}`}>
                                        <Button type="primary">
                                            Learn more
                                        </Button>
                                    </Link>
                                </div>
                            </Card>
                        </List.Item>
                    )}
                />
            )}
        </Modal>
    );
};

export default DishesModal;