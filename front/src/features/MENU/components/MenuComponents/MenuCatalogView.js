import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const MenuCatalogView = ({ catalogs, selectedCatalogs, onCatalogSelect }) => {
    return (
        <Select
            mode="multiple"
            placeholder="Select catalogs"
            value={selectedCatalogs}
            onChange={onCatalogSelect}
            style={{ width: '50%', marginBottom: '10px', paddingTop: '10px' }}
        >
            {catalogs.map((catalog) => (
                <Option key={catalog.catalog_id} value={catalog.catalog_id}>
                    {catalog.catalogs_name}
                </Option>
            ))}
        </Select>
    );
};

export default MenuCatalogView;