const db = require('../../db');

class StockModel {
    async create(stockData) {
        try {
            const { product_name, product_quantity, id_category } = stockData;
            const newStock = await db.query(`
                INSERT INTO "STOCK" (product_name, product_quantity, id_category)
                VALUES ($1, $2, $3) RETURNING *
            `, [product_name, product_quantity, id_category]);
            return newStock.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            const stocks = await db.query('SELECT * FROM "STOCK"');
            return stocks.rows;
        } catch (error) {
            throw error;
        }
    }

    async getOne(id) {
        try {
            const oneStock = await db.query('SELECT * FROM "STOCK" WHERE stock_id = $1', [id]);
            return oneStock.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async update(stockData) {
        try {
            const { stock_id, product_name, product_quantity, id_category } = stockData;
            const updatedStock = await db.query(`
                UPDATE "STOCK" SET product_name = $1, product_quantity = $2, id_category = $3
                WHERE stock_id = $4 RETURNING *
            `, [product_name, product_quantity, id_category, stock_id]);
            return updatedStock.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            const deletedStock = await db.query('DELETE FROM "STOCK" WHERE stock_id = $1 RETURNING *', [id]);
            return deletedStock.rows[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new StockModel();