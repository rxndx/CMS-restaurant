const db = require('../../db');

class AccountModel {
    async create(accountData) {
        try {
            const { id_brand, email, surname, account_name, password_hash, phone } = accountData;
            const newAccount = await db.query(`
                INSERT INTO "ACCOUNT" (id_brand, email, surname, account_name, password_hash, phone)
                VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
            `, [id_brand, email, surname, account_name, password_hash, phone]);
            return newAccount.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            const accounts = await db.query('SELECT * FROM "ACCOUNT"');
            return accounts.rows;
        } catch (error) {
            throw error;
        }
    }

    async getOne(id) {
        try {
            const oneAccount = await db.query('SELECT * FROM "ACCOUNT" WHERE account_id = $1', [id]);
            return oneAccount.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async update(accountData) {
        try {
            const { account_id, id_brand, email, surname, account_name, password_hash, phone } = accountData;
            const updatedAccount = await db.query(`
                UPDATE "ACCOUNT" SET id_brand = $1, email = $2, surname = $3, account_name = $4,
                                     password_hash = $5, phone = $6
                WHERE account_id = $7 RETURNING *
            `, [id_brand, email, surname, account_name, password_hash, phone, account_id]);
            return updatedAccount.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            const deletedAccount = await db.query('DELETE FROM "ACCOUNT" WHERE account_id = $1 RETURNING *', [id]);
            return deletedAccount.rows[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new AccountModel();