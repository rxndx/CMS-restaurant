import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, Rate, Collapse, Spin, Breadcrumb, Button, Modal, Checkbox } from 'antd';
import {
    productsSlice,
    reviewSlice,
    stockSlice,
} from "../../store/store";

const { Panel } = Collapse;

const DishesView = () => {
    const { dishId } = useParams();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);
    const [selectedDishId, setSelectedDishId] = useState(parseInt(dishId));
    const [otherDishes, setOtherDishes] = useState([]);
    const [dishIngredientsInfo, setDishIngredientsInfo] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
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
        }
    }, [selectedDishId, dishIngredients]);

    const handleDishChange = (dishId) => {
        setSelectedDishId(dishId);
    };

    const handleIngredientChange = (ingredientId, checked) => {
        if (checked) {
            setSelectedIngredients([...selectedIngredients, ingredientId]);
        } else {
            setSelectedIngredients(selectedIngredients.filter(id => id !== ingredientId));
        }
    };

    const handleSave = async () => {
        await Promise.all(selectedIngredients.map(async (ingredientId) => {
            const newDish = {
                id_stock: ingredientId,
                id_item_menu: selectedDishId
            };
            await dispatch(productsSlice.createItem(newDish));
        })).then(r => dispatch(productsSlice.fetchItems()));

        setModalVisible(false);
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
                        <Button type="primary" onClick={() => setModalVisible(true)}>Edit Ingredients</Button>
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
                {stock.map(ingredient => (
                    <Checkbox key={ingredient.stock_id} onChange={(e) => handleIngredientChange(ingredient.stock_id, e.target.checked)}>
                        {ingredient.product_name}
                    </Checkbox>
                ))}
            </Modal>
        </Spin>
    );
};

export default DishesView;