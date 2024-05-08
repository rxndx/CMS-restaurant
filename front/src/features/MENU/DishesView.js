import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, Rate, Collapse, Spin } from 'antd';
import {
    reviewSlice
} from "../../store/store";

const { Panel } = Collapse;

const DishesView = () => {
    const { menuId } = useParams();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);

    const reviews = useSelector((state) => state.reviews.list);
    const dishes = useSelector((state) => state.dishes.list);

    const dish = dishes.find(dish => dish.id_menu === parseInt(menuId));
    console.log('Dish:', dish);

    const dishReviews = dish ? reviews.filter((review) => review.id_menu_item === dish.id_menu) : [];
    console.log('Dish Reviews:', dishReviews);

    const imageUrl = window.location.origin + '/' + dish.menu_item_image_path;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            await Promise.all([
                dispatch(reviewSlice.fetchItems())
            ]);

            setLoading(false);
        };

        fetchData();
    }, [dispatch]);

    return (
        <Spin spinning={loading}>
            <Row gutter={[16, 16]}>
                <Col xs={24} md={8}>
                    <Card cover={<img src={imageUrl} alt={dish.menu_item_name} style={{ width: '100%', height: 'auto' }} />}>
                    </Card>
                </Col>
                <Col xs={24} md={16}>
                    <Card>
                        <h3>{dish && dish.menu_item_name}</h3>
                        <p>{dish && dish.menu_item_content}</p>
                        <p>Price: {dish && dish.price}</p>
                    </Card>
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
        </Spin>
    );
};

export default DishesView;