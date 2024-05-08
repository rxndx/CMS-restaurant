const db = require('../../db');

class OrderModel {
    async create(orderData) {
        try {
            const { id_client, status, price, receipt_date, completed_date } = orderData;
            const newOrder = await db.query(`
                INSERT INTO "ORDER" (id_client, status, price, receipt_date, completed_date)
                VALUES ($1, $2, $3, $4, $5) RETURNING *
            `, [id_client, status, price, receipt_date, completed_date]);
            return newOrder.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            const orders = await db.query('SELECT * FROM "ORDER"');
            return orders.rows;
        } catch (error) {
            throw error;
        }
    }

    async getOne(id) {
        try {
            const oneOrder = await db.query('SELECT * FROM "ORDER" WHERE order_id = $1', [id]);
            return oneOrder.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async update(orderData) {
        try {
            const { id_client, status, price, receipt_date, completed_date, order_id } = orderData;
            const updatedOrder = await db.query(`
                UPDATE "ORDER" SET id_client = $1, status = $2, price = $3,
                                   receipt_date = $4, completed_date = $5
                WHERE order_id = $6 RETURNING *
            `, [id_client, status, price, receipt_date, completed_date, order_id]);
            return updatedOrder.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            const deletedOrder = await db.query('DELETE FROM "ORDER" WHERE order_id = $1 RETURNING *', [id]);
            return deletedOrder.rows[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new OrderModel();