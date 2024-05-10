const db = require('../../db');

class MenuItemModel {
    async create(itemData) {
        try {
            const { menu_item_name, menu_item_content, menu_item_image_path, id_menu, price } = itemData;
            const newItemMenu = await db.query(`
                INSERT INTO "MENU_ITEM" (menu_item_name, menu_item_content, menu_item_image_path, id_menu, price)
                VALUES ($1, $2, $3, $4, $5) RETURNING *
            `, [menu_item_name, menu_item_content, menu_item_image_path, id_menu, price]);
            return newItemMenu.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            const menuItem = await db.query('SELECT * FROM "MENU_ITEM"');
            return menuItem.rows;
        } catch (error) {
            throw error;
        }
    }

    async getOne(id) {
        try {
            const oneItemMenu = await db.query('SELECT * FROM "MENU_ITEM" WHERE menu_item_id = $1', [id]);
            return oneItemMenu.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async update(itemData) {
        try {
            const { menu_item_id, menu_item_name, menu_item_content, menu_item_image_path, id_menu, price } = itemData;
            const updatedItem = await db.query(`
                UPDATE "MENU_ITEM" SET menu_item_name = $1, menu_item_content = $2, menu_item_image_path = $3,
                                       id_menu = $4, price = $5
                WHERE menu_item_id = $6 RETURNING *
            `, [menu_item_name, menu_item_content, menu_item_image_path, id_menu, price, menu_item_id]);
            return updatedItem.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            const deletedItemMenu = await db.query('DELETE FROM "MENU_ITEM" WHERE menu_item_id = $1 RETURNING *', [id]);
            return deletedItemMenu.rows[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new MenuItemModel();