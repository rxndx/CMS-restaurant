import React, { useState } from 'react';
import {Card, Typography, Tag, Button, Modal} from 'antd';
import DishesModal from "../DishesComponents/DishesModal";
import MenuEditModal from "./MenuEditModal";
import {catalogMenuSlice, menuSlice} from "../../../../store/store";
import {useDispatch} from "react-redux";

const MenuItemView = ({
                          menu,
                          catalogs,
                          catalogMenuRelations,
                          expandedMenu,
                          toggleMenuExpansion,
                          getMenuTags,
                          selectedTags, dishes
                      }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const dispatch = useDispatch();

    const handleDeleteMenu = () => {
        Modal.confirm({
            title: 'Delete Menu',
            content: 'Are you sure you want to delete this menu?',
            async onOk() {
                try {
                    const catalogMenuRelation = catalogMenuRelations.find(
                        (relation) => relation.menu_list && relation.menu_list.some((item) => item.menu_id === menu.menu_id)
                    );

                    if (catalogMenuRelation) {
                        await dispatch(catalogMenuSlice.deleteItem(catalogMenuRelation.catalog_menu_id));
                    }

                    await dispatch(menuSlice.deleteItem(menu.menu_id));
                    dispatch(menuSlice.fetchItems());
                } catch (error) {
                    console.error('Error deleting menu:', error.message);
                }
            },
        });
    };

    const handleToggleExpansion = () => {
        toggleMenuExpansion(menu.menu_id);
    };

    const menuTags = getMenuTags(menu.menu_id);

    const catalogRelation = catalogMenuRelations.find(
        (relation) => relation.menu_list && relation.menu_list.some((item) => item.menu_id === menu.menu_id)
    );

    const catalog =
        catalogRelation &&
        catalogs.find((catalog) => catalog.catalog_id === catalogRelation.catalog_id);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const openEditModal = () => {
        setEditModalVisible(true);
    };

    const closeEditModal = () => {
        setEditModalVisible(false);
    };

    return (
        <Card
            title={menu.menu_name}
            onClick={handleToggleExpansion}
            style={{ cursor: 'pointer' }}
            extra={
                <>
                    <Button onClick={openEditModal}>Edit</Button>
                    <Button onClick={handleDeleteMenu} type="danger">
                        Delete
                    </Button>
                </>
            }
        >
            <img
                src={menu.menu_image_path}
                alt={menu.menu_name}
                style={{ height: 200, width: '100%', objectFit: 'cover', marginBottom: 16 }}
            />
            <div style={{ display: expandedMenu === menu.menu_id ? 'block' : 'none', marginBottom: 15 }}>
                <p>{menu.menu_content}</p>
                {catalog && (
                    <div>
                        <Typography.Text strong>Catalog:</Typography.Text>
                        <Tag color="red" style={{ marginLeft: 8 }}>{catalog.catalogs_name}</Tag>
                        <Typography.Text strong>Country:</Typography.Text>
                        <Tag color="green" style={{ marginLeft: 8 }}>
                            {catalog.country_name.charAt(0).toUpperCase() + catalog.country_name.slice(1)}
                        </Tag>
                    </div>
                )}
            </div>
            <div>
                {menuTags.map((tag) => (
                    <Tag
                        key={tag.tag_id}
                        color={selectedTags.includes(tag.tag_id) ? 'blue' : undefined}
                        style={{
                            cursor: 'pointer',
                            margin: '4px',
                            pointerEvents: 'none',
                        }}
                    >
                        {tag.tag_name}
                    </Tag>
                ))}
            </div>
            <Button
                onClick={openModal}
                style={{ marginTop: 10, backgroundColor: '#1890ff', color: 'white', border: 'none' }}
            >
                Open dishes
            </Button>
            {modalVisible && <DishesModal dishes={dishes} menuId={menu.menu_id} closeModal={closeModal} />}
            {editModalVisible && <MenuEditModal menu={menu} catalogs={catalogs} closeModal={closeEditModal} />}
        </Card>
    );
};

export default MenuItemView;