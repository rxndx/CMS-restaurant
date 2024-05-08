import React, {useEffect, useMemo, useState} from 'react';
import {Button, Col, Input, Row, Spin} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import MenuTags from './components/MenuComponents/MenuTagsView';
import MenuCatalogView from './components/MenuComponents/MenuCatalogView';
import MenuCountriesView from './components/MenuComponents/MenuCountriesView';
import MenuItemView from './components/MenuComponents/MenuItemView';
import {
    catalogMenuSlice,
    catalogSlice,
    countrySlice,
    foodSlice,
    menuSlice,
    tagMenuSlice,
    tagSlice
} from '../../store/store';
import {filterAndSortMenus} from './utils/filterAndSortMenus';
import {clearFilter, updateFilter} from './utils/updateFilter';
import MenuCreationModal from "./components/MenuComponents/MenuCreationModal";

const { Search } = Input;

const MenuView = () => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedCatalogs, setSelectedCatalogs] = useState([]);
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [expandedMenu, setExpandedMenu] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const menus = useSelector((state) => state.menus.list);
    const tags = useSelector((state) => state.tags.list);
    const menuTags = useSelector((state) => state.tagsMenu.list);
    const countries = useSelector((state) => state.country.list);
    const catalogs = useSelector((state) => state.catalog.list);
    const catalogMenuRelations = useSelector((state) => state.catalogMenu.list);
    const dishes = useSelector((state) => state.dishes.list);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            await Promise.all([
                dispatch(menuSlice.fetchItems()),
                dispatch(tagSlice.fetchItems()),
                dispatch(tagMenuSlice.fetchItems()),
                dispatch(countrySlice.fetchItems()),
                dispatch(catalogSlice.fetchItems()),
                dispatch(catalogMenuSlice.fetchItems()),
                dispatch(foodSlice.fetchItems())
            ]);

            setLoading(false);
        };

        fetchData();
    }, [dispatch]);

    useEffect(() => {
        handleUpdateFilter();
    }, [selectedTags, selectedCatalogs, selectedCountries, searchValue]);

    const getMenuTags = (menuId) => {
        const menuTagIds = menuTags
            .filter((menuTag) => menuTag.id_menu === menuId)
            .map((menuTag) => menuTag.id_tags);

        return tags.filter((tag) => menuTagIds.includes(tag.tag_id));
    };

    const filteredMenus = useMemo(() => {
        return filterAndSortMenus(
            menus,
            tags,
            menuTags,
            countries,
            catalogs,
            catalogMenuRelations,
            selectedTags,
            selectedCatalogs,
            selectedCountries,
            searchValue
        );
    }, [menus, tags, menuTags, countries, catalogs, catalogMenuRelations, selectedTags, selectedCatalogs, selectedCountries, searchValue]);

    const toggleMenuExpansion = (menuId) => {
        setExpandedMenu((prevExpandedMenu) => (prevExpandedMenu === menuId ? null : menuId));
    };

    const handleTagClick = (tagId) => {
        setSelectedTags((prevTags) => {
            return prevTags.includes(tagId) ? prevTags.filter((id) => id !== tagId) : [...prevTags, tagId];
        });
    };

    const handleCatalogSelect = (value) => {
        setSelectedCatalogs(value);
        handleUpdateFilter();
    };

    const handleCountrySelect = (value) => {
        setSelectedCountries(value);
        handleUpdateFilter();
    };

    const handleUpdateFilter = () => {
        updateFilter({
            selectedTags,
            selectedCountries,
            selectedCatalogs,
            searchValue,
            tags,
            countries,
            catalogs
        });
    };

    const handleClearFilter = () => {
        setSearchValue('');
        setSelectedTags([]);
        setSelectedCatalogs([]);
        setSelectedCountries([]);
        clearFilter();
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div style={{margin: '20px'}}>
            <div>
                <Button type="primary" onClick={showModal}>Create New Menu</Button>
                <MenuCreationModal visible={isModalVisible} onCancel={handleCancel} catalogs={catalogs} />
            </div>
            <Search
                placeholder="Search for menu"
                onSearch={handleUpdateFilter}
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
                enterButton
            />
            <Spin spinning={loading} tip="Loading...">
                <div>
                    <MenuCatalogView catalogs={catalogs} selectedCatalogs={selectedCatalogs}
                                     onCatalogSelect={handleCatalogSelect}/>
                    <MenuCountriesView countries={countries} selectedCountries={selectedCountries}
                                       onCountrySelect={handleCountrySelect}/>
                </div>
                <Row gutter={[16, 16]} style={{marginTop: '20px'}}>
                    <Col span={18}>
                        <Row gutter={[16, 16]}>
                            {filteredMenus?.map((menu) => (
                                <Col span={8} key={menu.menu_id}>
                                    <MenuItemView
                                        menu={menu}
                                        catalogs={catalogs}
                                        catalogMenuRelations={catalogMenuRelations}
                                        expandedMenu={expandedMenu}
                                        toggleMenuExpansion={toggleMenuExpansion}
                                        getMenuTags={getMenuTags}
                                        selectedTags={selectedTags}
                                        dishes={dishes}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </Col>
                    <Col span={6}>
                        <MenuTags
                            tags={tags}
                            searchValue={searchValue}
                            selectedTags={selectedTags}
                            onFilterChange={(value) => {
                                setSearchValue(value);
                                handleUpdateFilter();
                            }}
                            onClearFilter={handleClearFilter}
                            onTagClick={handleTagClick}
                        />
                    </Col>
                </Row>
            </Spin>
        </div>
    );
};

export default MenuView;