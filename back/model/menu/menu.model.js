const db = require('../../db');

class MenuModel {
    async create(menuData) {
        try {
            const { menu_name, menu_content, menu_image_path } = menuData;
            const newMenu = await db.query(`
                INSERT INTO "MENU" (menu_name, menu_content, menu_image_path)
                VALUES ($1, $2, $3) RETURNING *
            `, [menu_name, menu_content, menu_image_path]);
            return newMenu.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            const menu = await db.query('SELECT * FROM "MENU"');
            return menu.rows;
        } catch (error) {
            throw error;
        }
    }

    async getOne(id) {
        try {
            const oneMenu = await db.query('SELECT * FROM "MENU" WHERE menu_id = $1', [id]);
            return oneMenu.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async update(menuData) {
        try {
            const { menu_id, menu_name, menu_content, menu_image_path } = menuData;
            const updatedMenu = await db.query(`
                UPDATE "MENU" SET menu_name = $1, menu_content = $2, menu_image_path = $3
                WHERE menu_id = $4 RETURNING *
            `, [menu_name, menu_content, menu_image_path, menu_id]);
            return updatedMenu.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            const deletedMenu = await db.query('DELETE FROM "MENU" WHERE menu_id = $1 RETURNING *', [id]);
            return deletedMenu.rows[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new MenuModel();