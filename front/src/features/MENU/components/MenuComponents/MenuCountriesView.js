import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const MenuCountriesView = ({ countries, selectedCountries, onCountrySelect }) => {
    return (
        <Select
            mode="multiple"
            placeholder="Select countries"
            value={selectedCountries}
            onChange={onCountrySelect}
            style={{ width: '50%', marginBottom: '10px', paddingTop: '10px' }}
        >
            {countries.map((country) => (
                <Option key={country.country_id} value={country.country_id}>
                    {country.country_name}
                </Option>
            ))}
        </Select>
    );
};

export default MenuCountriesView;