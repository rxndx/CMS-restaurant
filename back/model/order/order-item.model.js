const db = require('../../db');

class OrderItemModel {
    async create(orderItemData) {
        try {
            const { id_order, id_menu_item, quantity } = orderItemData;
            const newOrderItem = await db.query(`
                INSERT INTO "ORDER_ITEM" (id_order, id_menu_item, quantity)
                VALUES ($1, $2, $3) RETURNING *
            `, [id_order, id_menu_item, quantity]);
            return newOrderItem.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            const query = `
                SELECT
                    "ACCOUNT".id_brand,
                    "ORDER".order_id as order_number,
                    "CUSTOMER_PROFILE".address,
                    "ACCOUNT".surname,
                    "ACCOUNT".account_name,
                    "ACCOUNT".phone,
                    ARRAY_AGG("MENU_ITEM".menu_item_name) as menu_items,
                    ARRAY_AGG("ORDER_ITEM".quantity) as quantities
                FROM 
                    "ORDER"
                JOIN 
                    "ORDER_ITEM" ON "ORDER".order_id = "ORDER_ITEM".id_order
                JOIN 
                    "MENU_ITEM" ON "ORDER_ITEM".id_menu_item = "MENU_ITEM".menu_item_id
                JOIN 
                    "CUSTOMER_PROFILE" ON "ORDER".id_client = "CUSTOMER_PROFILE".customer_id
                JOIN 
                    "ACCOUNT" ON "CUSTOMER_PROFILE".id_account = "ACCOUNT".account_id
                GROUP BY 
                    "ORDER".order_id, "CUSTOMER_PROFILE".customer_id, "ACCOUNT".account_id
            `;
            const orderItems = await db.query(query);
            return orderItems.rows;
        } catch (error) {
            throw error;
        }
    }

    async getOne(id) {
        try {
            const oneOrderItem = await db.query(`
            SELECT
                "ORDER_ITEM".order_item_id,
                "ACCOUNT".id_brand,
                "ORDER".order_id as order_number,
                "CUSTOMER_PROFILE".address,
                "ACCOUNT".surname,
                "ACCOUNT".account_name,
                "ACCOUNT".phone,
                ARRAY_AGG("MENU_ITEM".menu_item_name) as menu_items,
                ARRAY_AGG("ORDER_ITEM".quantity) as quantities
            FROM 
                "ORDER"
            JOIN 
                "ORDER_ITEM" ON "ORDER".order_id = "ORDER_ITEM".id_order
            JOIN 
                "MENU_ITEM" ON "ORDER_ITEM".id_menu_item = "MENU_ITEM".menu_item_id
            JOIN 
                "CUSTOMER_PROFILE" ON "ORDER".id_client = "CUSTOMER_PROFILE".customer_id
            JOIN 
                "ACCOUNT" ON "CUSTOMER_PROFILE".id_account = "ACCOUNT".account_id
            WHERE
                "ORDER_ITEM".order_item_id = $1
            GROUP BY 
                "ORDER_ITEM".order_item_id, "ORDER".order_id, "CUSTOMER_PROFILE".customer_id, "ACCOUNT".account_id
        `, [id]);
            return oneOrderItem.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async update(orderItemData) {
        try {
            const { order_item_id, id_order, id_menu_item, quantity } = orderItemData;
            const updatedOrderItem = await db.query(`
                UPDATE "ORDER_ITEM" SET id_order = $1, id_menu_item = $2, quantity = $3
                WHERE order_item_id = $4 RETURNING *
            `, [id_order, id_menu_item, quantity, order_item_id]);
            return updatedOrderItem.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            const deletedOrderItem = await db.query('DELETE FROM "ORDER_ITEM" WHERE order_item_id = $1 RETURNING *', [id]);
            return deletedOrderItem.rows[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new OrderItemModel();