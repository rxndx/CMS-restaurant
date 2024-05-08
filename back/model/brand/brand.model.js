const db = require('../../db');

class BrandModel {
    async create(brandData) {
        try {
            const { brand_name, id_design } = brandData;
            const newBrand = await db.query(`
                INSERT INTO "BRAND" (brand_name, id_design)
                VALUES ($1, $2) RETURNING *
            `, [brand_name, id_design]);
            return newBrand.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            const brand = await db.query('SELECT b.brand_id, b.brand_name, d.file_path FROM "BRAND" b JOIN "DESIGN" d ON b.id_design = d.design_id');
            return brand.rows;
        } catch (error) {
            throw error;
        }
    }

    async getOne(id) {
        try {
            const oneBrand = await db.query('SELECT b.brand_id, b.brand_name, d.file_path FROM "BRAND" b JOIN "DESIGN" d ON b.id_design = d.design_id WHERE b.brand_id = $1', [id]);
            return oneBrand.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async update(brandData) {
        try {
            const { brand_id, brand_name, id_design } = brandData;
            const updatedBrand = await db.query(`
                UPDATE "BRAND" SET brand_name = $1, id_design = $2
                WHERE brand_id = $3 RETURNING *
            `, [brand_name, id_design, brand_id]);
            return updatedBrand.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            const deletedBrand = await db.query('DELETE FROM "BRAND" WHERE brand_id = $1 RETURNING *', [id]);
            return deletedBrand.rows[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new BrandModel();