// TODO: возможно нужно будет переделать в связи с шаблоном

import React from 'react';
import { Button, Space } from "antd";

export function GenericTableColumn(columns, handleEdit, handleDelete) {
    return [
        ...columns,
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Space>
                    <Button onClick={() => handleEdit(record)}>Edit</Button>
                    <Button onClick={() => handleDelete(record.id)}>Delete</Button>
                </Space>
            ),
        },
    ];
}