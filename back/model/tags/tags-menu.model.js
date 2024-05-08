const db = require('../../db');

class TagsMenuModel {
    async create(menuTagData) {
        try {
            const { id_menu, id_tags } = menuTagData;
            const newMenuTag = await db.query(`
                INSERT INTO "MENU_TAGS" (id_menu, id_tags)
                VALUES ($1, $2) RETURNING *
            `, [id_menu, id_tags]);
            return newMenuTag.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            const menuTags = await db.query('SELECT * FROM "MENU_TAGS"');
            return menuTags.rows;
        } catch (error) {
            throw error;
        }
    }

    async getOne(id) {
        try {
            const menuTagsResult = await db.query(`
                SELECT
                    mt.menu_tags_id,
                    m.menu_name,
                    m.menu_content,
                    t.tag_name,
                    t.tag_content
                FROM
                    public."MENU_TAGS" mt
                        JOIN
                    public."MENU" m ON mt.id_menu = m.menu_id
                        JOIN
                    public."TAGS" t ON mt.id_tags = t.tag_id
                WHERE
                    mt.menu_tags_id = $1;
            `, [id]);
            return menuTagsResult.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async update(menuTagData) {
        try {
            const { menu_tags_id, id_menu, id_tags } = menuTagData;
            const updatedMenuTag = await db.query(`
                UPDATE "MENU_TAGS" SET id_menu = $1, id_tags = $2
                WHERE menu_tags_id = $3 RETURNING *
            `, [id_menu, id_tags, menu_tags_id]);
            return updatedMenuTag.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            const deletedMenuTag = await db.query('DELETE FROM "MENU_TAGS" WHERE menu_tags_id = $1 RETURNING *', [id]);
            return deletedMenuTag.rows[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new TagsMenuModel();