const db = require('../../db');
class CatalogModel {
    async create(catalogData) {
        try {
            const { catalogs_name, catalog_content, id_country, id_brand } = catalogData;
            const newCatalog = await db.query(`
                INSERT INTO "CATALOG" (catalogs_name, catalog_content, id_country, id_brand)
                VALUES ($1, $2, $3, $4) RETURNING *
            `, [catalogs_name, catalog_content, id_country, id_brand]);
            return newCatalog.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            const catalog = await db.query('SELECT c.catalog_id, c.catalogs_name, co.country_name, b.brand_name FROM "CATALOG" c JOIN "COUNTRY" co ON c.id_country = co.country_id JOIN "BRAND" b ON c.id_brand = b.brand_id');
            return catalog.rows;
        } catch (error) {
            throw error;
        }
    }

    async getOne(id) {
        try {
            const oneCatalog = await db.query('SELECT c.catalog_id, c.catalogs_name, co.country_name, b.brand_name FROM "CATALOG" c JOIN "COUNTRY" co ON c.id_country = co.country_id JOIN "BRAND" b ON c.id_brand = b.brand_id WHERE c.catalog_id = $1', [id]);
            return oneCatalog.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async update(catalogData) {
        try {
            const { catalog_id, catalogs_name, catalog_content, id_country, id_brand } = catalogData;
            const updatedCatalog = await db.query(`
                UPDATE "CATALOG" SET catalogs_name = $1, catalog_content = $2, id_country = $3, id_brand = $4
                WHERE catalog_id = $5 RETURNING *
            `, [catalogs_name, catalog_content, id_country, id_brand, catalog_id]);
            return updatedCatalog.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            const deletedCatalog = await db.query('DELETE FROM "CATALOG" WHERE catalog_id = $1 RETURNING *', [id]);
            return deletedCatalog.rows[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new CatalogModel();