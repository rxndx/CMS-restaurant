const db = require('../../db');

class CustomerModel {
    async create(customerData) {
        try {
            const { address, birthday, company, position, allergy, dietary_restriction, loyalty_points, id_account } = customerData;
            const newCustomer = await db.query(`
                INSERT INTO "CUSTOMER_PROFILE" (address, birthday, company, position, allergy, dietary_restriction, loyalty_points, id_account)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
            `, [address, birthday, company, position, allergy, dietary_restriction, loyalty_points, id_account]);
            return newCustomer.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            const customers = await db.query('SELECT * FROM "CUSTOMER_PROFILE"');
            return customers.rows;
        } catch (error) {
            throw error;
        }
    }

    async getOne(id) {
        try {
            const oneCustomer = await db.query('SELECT * FROM "CUSTOMER_PROFILE" WHERE customer_id = $1', [id]);
            return oneCustomer.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async update(customerData) {
        try {
            const { customer_id, address, birthday, company, position, allergy, dietary_restriction, loyalty_points, id_account } = customerData;
            const updatedCustomer = await db.query(`
                UPDATE "CUSTOMER_PROFILE" SET address = $1, birthday = $2, company = $3, position = $4, 
                allergy = $5, dietary_restriction = $6, loyalty_points = $7, id_account = $8
                WHERE customer_id = $9 RETURNING *
            `, [address, birthday, company, position, allergy, dietary_restriction, loyalty_points, id_account, customer_id]);
            return updatedCustomer.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            const deletedCustomer = await db.query('DELETE FROM "CUSTOMER_PROFILE" WHERE customer_id = $1 RETURNING *', [id]);
            return deletedCustomer.rows[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new CustomerModel();