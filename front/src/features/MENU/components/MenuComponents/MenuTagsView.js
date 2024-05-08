import React, { useState } from 'react';
import { Tooltip, List, Tag, Button } from 'antd';

const MenuFilterPanel = ({ tags, searchValue, selectedTags, onFilterChange, onClearFilter, onTagClick }) => {
    const [hoveredTag, setHoveredTag] = useState(null);

    const handleTagHover = (tag) => {
        setHoveredTag(tag);
    };

    const handleTagLeave = () => {
        setHoveredTag(null);
    };

    const handleTagClick = (tag) => {
        onTagClick(tag.tag_id);
        onFilterChange(searchValue.trim());
    };

    const handleClearFilters = () => {
        onClearFilter();
    };

    const ModalContent = ({ tag }) => (
        <div>
            <h4>{tag.tag_name}</h4>
            <p>{tag.tag_content}</p>
        </div>
    );

    const renderItem = (tag) => (
        <List.Item>
            <Tooltip title={<ModalContent tag={tag} />} placement="right">
                <div
                    onMouseEnter={() => handleTagHover(tag)}
                    onMouseLeave={handleTagLeave}
                    style={{ cursor: 'pointer' }}
                >
                    <Tag
                        color={selectedTags.includes(tag.tag_id) ? 'blue' : 'default'}
                        onClick={() => handleTagClick(tag)}
                    >
                        {tag.tag_name}
                    </Tag>
                </div>
            </Tooltip>
        </List.Item>
    );

    return (
        <div>
            <h3>Tags
                <Button type="link" onClick={handleClearFilters} style={{ marginBottom: '10px' }}>
                    Clear Filters
                </Button></h3>
            <List
                dataSource={tags}
                renderItem={renderItem}
                style={{ maxWidth: '100px', marginBottom: '10px' }}
            />
        </div>
    );
};

export default MenuFilterPanel;