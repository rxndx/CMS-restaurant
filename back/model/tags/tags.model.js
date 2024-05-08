const db = require('../../db');

class TagsModel {
    async create(tagData) {
        try {
            const { tag_name, tag_content } = tagData;
            const newTag = await db.query(`INSERT INTO "TAGS" (tag_name, tag_content) VALUES ($1, $2) RETURNING *`, [tag_name, tag_content]);
            return newTag.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            const tags = await db.query('SELECT * FROM "TAGS"');
            return tags.rows;
        } catch (error) {
            throw error;
        }
    }

    async getOne(id) {
        try {
            const oneTag = await db.query('SELECT * FROM "TAGS" WHERE tag_id = $1', [id]);
            return oneTag.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async update(tagData) {
        try {
            const { tag_id, tag_name, tag_content } = tagData;
            const updatedTag = await db.query('UPDATE "TAGS" SET tag_name = $1, tag_content = $2 WHERE tag_id = $3 RETURNING *',
                [tag_name, tag_content, tag_id]);
            return updatedTag.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            const deletedTag = await db.query('DELETE FROM "TAGS" WHERE tag_id = $1 RETURNING *', [id]);
            return deletedTag.rows[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new TagsModel();