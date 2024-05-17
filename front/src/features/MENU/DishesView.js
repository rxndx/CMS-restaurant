import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, Rate, Collapse, Spin, Breadcrumb, Button, Modal, Select, Space } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { productsSlice, reviewSlice, stockSlice } from "../../store/store";

const { Panel } = Collapse;
const { Option } = Select;

// TODO: надо разбить класс и сделать его менее объёмным
const DishesView = () => {
    const { dishId } = useParams();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);
    const [selectedDishId, setSelectedDishId] = useState(parseInt(dishId));
    const [otherDishes, setOtherDishes] = useState([]);
    const [dishIngredientsInfo, setDishIngredientsInfo] = useState([]);
    const [ingredientSelections, setIngredientSelections] = useState([{ id: 0, ingredient: null }]);
    const [modalVisible, setModalVisible] = useState(false);

    const reviews = useSelector((state) => state.reviews.list);
    const dishes = useSelector((state) => state.dishes.list);
    const dishIngredients = useSelector((state) => state.products.list);
    const stock = useSelector((state) => state.stock.list);

    const dish = dishes.find(dish => dish.menu_item_id === selectedDishId);

    const dishReviews = dish ? reviews.filter((review) => review.id_menu_item === dish.menu_item_id) : [];

    const imageUrl = dish ? window.location.origin + '/' + dish.menu_item_image_path : '';

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            await Promise.all([
                dispatch(reviewSlice.fetchItems()),
                dispatch(productsSlice.fetchItems()),
                dispatch(stockSlice.fetchItems()),
            ]);

            setLoading(false);
        };

        fetchData();
    }, [dispatch]);

    useEffect(() => {
        if (selectedDishId && dishes.length > 0) {
            const otherDishesInMenu = dishes.filter(d => d.id_menu === dish.id_menu && d.menu_item_id !== selectedDishId);
            setOtherDishes(otherDishesInMenu);
        }
    }, [selectedDishId, dishes, dish]);

    useEffect(() => {
        if (selectedDishId && dishIngredients.length > 0) {
            const selectedDishIngredients = dishIngredients.find(dish => dish.menu_item_id === selectedDishId);
            setDishIngredientsInfo(selectedDishIngredients ? selectedDishIngredients.products : []);
            const initialIngredients = selectedDishIngredients ? selectedDishIngredients.products.map(prod => ({ id: prod.product_id, ingredient: prod })) : [];
            setIngredientSelections(initialIngredients);
        }
    }, [selectedDishId, dishIngredients]);

    const handleDishChange = (dishId) => {
        setSelectedDishId(dishId);
    };

    const handleIngredientChange = (index, selectedIngredient) => {
        setIngredientSelections(prevState => {
            const updatedSelections = [...prevState];
            updatedSelections[index] = { id: index, ingredient: selectedIngredient };
            return updatedSelections;
        });
    };

    const handleAddIngredient = () => {
        setIngredientSelections(prevState => {
            const newIndex = prevState.length;
            return [...prevState, { id: newIndex, ingredient: null }];
        });
    };

    const handleRemoveIngredient = (index) => {
        const ingredientToRemove = ingredientSelections[index];
        if (ingredientToRemove.ingredient) {
            const { product_id } = ingredientToRemove.ingredient;
            dispatch(productsSlice.deleteItem(product_id)).then(r => dispatch(productsSlice.fetchItems()));
        }
        setIngredientSelections(prevState => prevState.filter((_, i) => i !== index));
    };

    const updateDishIngredients = async () => {
        await Promise.all(ingredientSelections.map(async ({ ingredient }) => {
            if (ingredient) {
                const existingIngredient = dishIngredientsInfo.find(ing => ing.product_id === ingredient.product_id);
                const newDish = {
                    id_stock: ingredient.stock_id,
                    id_item_menu: selectedDishId
                };
                await dispatch(productsSlice.createItem(newDish));
            }
        })).then(() => dispatch(productsSlice.fetchItems()));
    };

    const handleSave = async () => {
        if (ingredientSelections.some(({ ingredient }) => ingredient)) {
            await updateDishIngredients();
        }
        setModalVisible(false);
    };

    const handleModalOpen = () => {
        if (dishIngredientsInfo.length === 0) {
            setIngredientSelections([{ id: 0, ingredient: null }]);
        }
        setModalVisible(true);
    };

    return (
        <Spin spinning={loading}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item><Link to="/menu">Menu</Link></Breadcrumb.Item>
                <Breadcrumb.Item>{dish && dish.menu_item_name}</Breadcrumb.Item>
            </Breadcrumb>
            <Row gutter={[16, 16]}>
                <Col xs={24} md={8}>
                    {imageUrl && (
                        <Card cover={<img src={imageUrl} alt={dish.menu_item_name} style={{ width: '100%', height: 'auto' }} />}>
                        </Card>
                    )}
                </Col>
                <Col xs={24} md={16}>
                    <Card>
                        <h3>{dish && dish.menu_item_name}</h3>
                        <p>{dish && dish.menu_item_content}</p>
                        <p>Price: {dish && dish.price}</p>
                        <Button type="primary" onClick={handleModalOpen}>Edit Ingredients</Button>
                    </Card>
                    {dishIngredientsInfo.length > 0 && (
                        <Row>
                            <Col xs={24}>
                                <h3>Ingredients:</h3>
                                <ul>
                                    {dishIngredientsInfo.map(ingredient => (
                                        <li key={ingredient.product_id}>{ingredient.product_name}</li>
                                    ))}
                                </ul>
                            </Col>
                        </Row>
                    )}
                </Col>
            </Row>
            <Row>
                <Col xs={24}>
                    <Collapse>
                        {dishReviews.map((review) => (
                            <Panel header={<Rate disabled defaultValue={review.rating} />} key={review.review_id}>
                                <p>{review.comment}</p>
                            </Panel>
                        ))}
                    </Collapse>
                </Col>
            </Row>
            <Row style={{ marginTop: '20px' }}>
                <Col xs={24}>
                    {otherDishes.length > 0 && (
                        <>
                            <h3>Other Dishes in this Menu:</h3>
                            <Row gutter={[16, 16]}>
                                {otherDishes.map((dish) => (
                                    <Col key={dish.menu_item_id} xs={24} sm={12} md={8} lg={6}>
                                        <Card
                                            title={dish.menu_item_name}
                                            extra={<Link to={`/menu/${dish.id_menu}/${dish.menu_item_id}/${encodeURIComponent(dish.menu_item_name)}`}>
                                                View
                                            </Link>}
                                            onClick={() => handleDishChange(dish.menu_item_id)}
                                        >
                                            <img src={window.location.origin + '/' + dish.menu_item_image_path} alt={dish.menu_item_name} style={{ width: '100%', height: 'auto' }} />
                                            <p>{dish.menu_item_content}</p>
                                            <p>Price: {dish.price}</p>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </>
                    )}
                </Col>
            </Row>
            <Modal
                title="Select Ingredients"
                visible={modalVisible}
                onOk={handleSave}
                onCancel={() => setModalVisible(false)}
            >
                {ingredientSelections.map(({ id, ingredient }, index) => (
                    <Row key={id} style={{ marginBottom: '10px' }}>
                        <Col span={20}>
                            <Select
                                style={{ width: '100%' }}
                                placeholder="Select ingredient"
                                value={ingredient ? ingredient.product_name : undefined}
                                onChange={(value) => {
                                    const selectedIngredient = stock.find(ing => ing.product_name === value);
                                    handleIngredientChange(index, selectedIngredient);
                                }}
                            >
                                {stock.map(ingredient => (
                                    <Option key={ingredient.stock_id} value={ingredient.product_name}>{ingredient.product_name}</Option>
                                ))}
                            </Select>
                        </Col>
                        <Col span={4}>
                            <Space>
                                {index === ingredientSelections.length - 1 && (
                                    <PlusCircleOutlined onClick={handleAddIngredient} style={{ fontSize: '20px', color: '#1890ff' }} />
                                )}
                                <MinusCircleOutlined onClick={() => handleRemoveIngredient(index)} style={{ fontSize: '20px', color: '#ff4d4f' }} />
                            </Space>
                        </Col>
                    </Row>
                ))}
            </Modal>
        </Spin>
    );
};

export default DishesView;