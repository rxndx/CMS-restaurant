const db = require('../../db');

class TagsFoodModel {
    async create(foodTagData) {
        try {
            const { id_item_menu, id_tags } = foodTagData;
            const newFoodTag = await db.query(`
                INSERT INTO "FOOD_TAGS" (id_item_menu, id_tags)
                VALUES ($1, $2) RETURNING *
            `, [id_item_menu, id_tags]);
            return newFoodTag.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            const foodTags = await db.query('SELECT * FROM "FOOD_TAGS"');
            return foodTags.rows;
        } catch (error) {
            throw error;
        }
    }

    async getOne(id) {
        try {
            const foodTagsResult = await db.query(`
                SELECT
                    ft.food_tags_id,
                    mi.menu_item_id,
                    mi.menu_item_name,
                    mi.menu_item_content,
                    mi.id_menu,
                    mi.price
                FROM
                    public."FOOD_TAGS" ft
                        JOIN
                    public."MENU_ITEM" mi ON ft.id_item_menu = mi.menu_item_id
                WHERE
                    ft.food_tags_id = $1;
            `, [id]);
            return foodTagsResult.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async update(foodTagData) {
        try {
            const { food_tags_id, id_item_menu, id_tags } = foodTagData;
            const updatedFoodTag = await db.query(`
                UPDATE "FOOD_TAGS" SET id_item_menu = $1, id_tags = $2
                WHERE food_tags_id = $3 RETURNING *
            `, [id_item_menu, id_tags, food_tags_id]);
            return updatedFoodTag.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            const deletedFoodTag = await db.query('DELETE FROM "FOOD_TAGS" WHERE food_tags_id = $1 RETURNING *', [id]);
            return deletedFoodTag.rows[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new TagsFoodModel();