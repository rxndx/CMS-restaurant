const db = require('../../db');

class CountryModel {
    async create(countryData) {
        try {
            const { country_name } = countryData;
            const newCountry = await db.query(`
                INSERT INTO "COUNTRY" (country_name)
                VALUES ($1) RETURNING *
            `, [country_name]);
            return newCountry.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            const countries = await db.query('SELECT * FROM "COUNTRY"');
            return countries.rows;
        } catch (error) {
            throw error;
        }
    }

    async getOne(id) {
        try {
            const oneCountry = await db.query('SELECT * FROM "COUNTRY" WHERE country_id = $1', [id]);
            return oneCountry.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async update(countryData) {
        try {
            const { country_id, country_name } = countryData;
            const updatedCountry = await db.query(`
                UPDATE "COUNTRY" SET country_name = $1
                WHERE country_id = $2 RETURNING *
            `, [country_name, country_id]);
            return updatedCountry.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            const deletedCountry = await db.query('DELETE FROM "COUNTRY" WHERE country_id = $1 RETURNING *', [id]);
            return deletedCountry.rows[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new CountryModel();