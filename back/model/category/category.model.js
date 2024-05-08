const db = require('../../db');

class CategoryModel {
    async create(categoryData) {
        try {
            const { category_name } = categoryData;
            const newCategory = await db.query(`
                INSERT INTO "CATEGORY" (category_name)
                VALUES ($1) RETURNING *
            `, [category_name]);
            return newCategory.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            const category = await db.query('SELECT * FROM "CATEGORY"');
            return category.rows;
        } catch (error) {
            throw error;
        }
    }

    async getOne(id) {
        try {
            const oneCategory = await db.query('SELECT * FROM "CATEGORY" WHERE category_id = $1', [id]);
            return oneCategory.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async update(categoryData) {
        try {
            const { category_id, category_name } = categoryData;
            const updatedCategory = await db.query(`
                UPDATE "CATEGORY" SET category_name = $1
                WHERE category_id = $2 RETURNING *
            `, [category_name, category_id]);
            return updatedCategory.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            const deletedCategory = await db.query('DELETE FROM "CATEGORY" WHERE category_id = $1 RETURNING *', [id]);
            return deletedCategory.rows[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new CategoryModel();