const db = require('../../db');

class DesignModel {
    async create(designData) {
        try {
            const { design_type, file_path } = designData;
            const newDesign = await db.query(`
                INSERT INTO "DESIGN" (design_type, file_path)
                VALUES ($1, $2) RETURNING *
            `, [design_type, file_path]);
            return newDesign.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            const designs = await db.query('SELECT * FROM "DESIGN"');
            return designs.rows;
        } catch (error) {
            throw error;
        }
    }

    async getOne(id) {
        try {
            const oneDesign = await db.query('SELECT * FROM "DESIGN" WHERE design_id = $1', [id]);
            return oneDesign.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async update(designData) {
        try {
            const { design_id, design_type, file_path } = designData;
            const updatedDesign = await db.query(`
                UPDATE "DESIGN" SET design_type = $1, file_path = $2
                WHERE design_id = $3 RETURNING *
            `, [design_type, file_path, design_id]);
            return updatedDesign.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            const deletedDesign = await db.query('DELETE FROM "DESIGN" WHERE design_id = $1 RETURNING *', [id]);
            return deletedDesign.rows[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new DesignModel();