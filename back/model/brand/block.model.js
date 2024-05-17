const db = require('../../db');

class BlockModel {
    async create(blockData) {
        try {
            const { id_brand, type, position, content_path, content_info } = blockData;
            const newBlock = await db.query(`
                INSERT INTO "BLOCK" (id_brand, type, position, content_path, content_info)
                VALUES ($1, $2, $3, $4, $5) RETURNING *
            `, [id_brand, type, position, content_path, content_info]);
            return newBlock.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            const blocks = await db.query('SELECT blk.block_id, blk.id_brand, blk.type, blk.position, blk.content_path, blk.content_info, br.brand_name FROM "BLOCK" blk JOIN "BRAND" br ON blk.id_brand = br.brand_id');
            return blocks.rows;
        } catch (error) {
            throw error;
        }
    }

    async getOne(id) {
        try {
            const oneBlock = await db.query('SELECT blk.block_id, blk.id_brand, blk.type, blk.position, blk.content_path, blk.content_info, br.brand_name FROM "BLOCK" blk JOIN "BRAND" br ON blk.id_brand = br.brand_id WHERE blk.block_id = $1', [id]);
            return oneBlock.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async update(blockData) {
        try {
            const { block_id, id_brand, type, position, content_path, content_info } = blockData;
            const updatedBlock = await db.query(`
                UPDATE "BLOCK" SET id_brand = $1, type = $2, position = $3, content_path = $4, content_info = $5
                WHERE block_id = $6 RETURNING *
            `, [id_brand, type, position, content_path, content_info, block_id]);
            return updatedBlock.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            const deletedBlock = await db.query('DELETE FROM "BLOCK" WHERE block_id = $1 RETURNING *', [id]);
            return deletedBlock.rows[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new BlockModel();