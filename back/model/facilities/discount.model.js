const db = require('../../db');

class DiscountModel {
    async create(discountData) {
        try {
            const { discount_name, discount_percent, id_menu } = discountData;
            const newDiscount = await db.query(`
                INSERT INTO "DISCOUNT" (discount_name, discount_percent, id_menu)
                VALUES ($1, $2, $3) RETURNING *
            `, [discount_name, discount_percent, id_menu]);
            return newDiscount.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            const discounts = await db.query('SELECT * FROM "DISCOUNT"');
            return discounts.rows;
        } catch (error) {
            throw error;
        }
    }

    async getOne(id) {
        try {
            const oneDiscount = await db.query('SELECT * FROM "DISCOUNT" WHERE discount_id = $1', [id]);
            return oneDiscount.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async update(discountData) {
        try {
            const { discount_id, discount_name, discount_percent, id_menu } = discountData;
            const updatedDiscount = await db.query(`
                UPDATE "DISCOUNT" SET discount_name = $1, discount_percent = $2, id_menu = $3
                WHERE discount_id = $4 RETURNING *
            `, [discount_name, discount_percent, id_menu, discount_id]);
            return updatedDiscount.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            const deletedDiscount = await db.query('DELETE FROM "DISCOUNT" WHERE discount_id = $1 RETURNING *', [id]);
            return deletedDiscount.rows[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new DiscountModel();