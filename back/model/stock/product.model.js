const db = require('../../db');

class ProductModel {
    async create(productData) {
        try {
            const { id_stock, id_item_menu } = productData;
            const newProduct = await db.query(`
                INSERT INTO "PRODUCT" (id_stock, id_item_menu)
                VALUES ($1, $2) RETURNING *
            `, [id_stock, id_item_menu]);
            return newProduct.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            const products = await db.query('SELECT mi.menu_item_id, mi.menu_item_name, mi.menu_item_content, mi.id_menu, mi.price, json_agg(json_build_object(\'product_id\', p.product_id, \'id_stock\', p.id_stock, \'id_item_menu\', p.id_item_menu, \'product_name\', s.product_name, \'product_quantity\', s.product_quantity, \'id_category\', s.id_category)) as products FROM "PRODUCT" p JOIN "STOCK" s ON p.id_stock = s.stock_id JOIN "MENU_ITEM" mi ON p.id_item_menu = mi.menu_item_id GROUP BY mi.menu_item_id, mi.menu_item_name, mi.menu_item_content, mi.id_menu, mi.price');
            return products.rows;
        } catch (error) {
            throw error;
        }
    }

    async getOne(id) {
        try {
            const oneProduct = await db.query('SELECT p.product_id, mi.menu_item_id, mi.menu_item_name, mi.menu_item_content, mi.id_menu, mi.price, json_agg(json_build_object(\'id_stock\', p.id_stock, \'id_item_menu\', p.id_item_menu, \'product_name\', s.product_name, \'product_quantity\', s.product_quantity, \'id_category\', s.id_category)) as products FROM "PRODUCT" p JOIN "STOCK" s ON p.id_stock = s.stock_id JOIN "MENU_ITEM" mi ON p.id_item_menu = mi.menu_item_id WHERE p.product_id = $1 GROUP BY mi.menu_item_id, mi.menu_item_name, mi.menu_item_content, mi.id_menu, mi.price, p.product_id', [id]);
            return oneProduct.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async update(productData) {
        try {
            const { product_id, id_stock, id_item_menu } = productData;
            const updatedProduct = await db.query(`
                UPDATE "PRODUCT" SET id_stock = $1, id_item_menu = $2
                WHERE product_id = $3 RETURNING *
            `, [id_stock, id_item_menu, product_id]);
            return updatedProduct.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            const deletedProduct = await db.query('DELETE FROM "PRODUCT" WHERE product_id = $1 RETURNING *', [id]);
            return deletedProduct.rows[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ProductModel();