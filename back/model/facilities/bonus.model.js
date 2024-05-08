const db = require('../../db');

class BonusModel {
    async create(bonusData) {
        try {
            const { bonus_name, bonus_content, bonus_score, id_item_menu } = bonusData;
            const newBonus = await db.query(`
                INSERT INTO "BONUS" (bonus_name, bonus_content, bonus_score, id_item_menu)
                VALUES ($1, $2, $3, $4) RETURNING *
            `, [bonus_name, bonus_content, bonus_score, id_item_menu]);
            return newBonus.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            const bonuses = await db.query('SELECT * FROM "BONUS"');
            return bonuses.rows;
        } catch (error) {
            throw error;
        }
    }

    async getOne(id) {
        try {
            const oneBonus = await db.query('SELECT * FROM "BONUS" WHERE bonus_id = $1', [id]);
            return oneBonus.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async update(bonusData) {
        try {
            const { bonus_id, bonus_name, bonus_content, bonus_score, id_item_menu } = bonusData;
            const updatedBonus = await db.query(`
                UPDATE "BONUS" SET bonus_name = $1, bonus_content = $2, bonus_score = $3, id_item_menu = $4
                WHERE bonus_id = $5 RETURNING *
            `, [bonus_name, bonus_content, bonus_score, id_item_menu, bonus_id]);
            return updatedBonus.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            const deletedBonus = await db.query('DELETE FROM "BONUS" WHERE bonus_id = $1 RETURNING *', [id]);
            return deletedBonus.rows[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new BonusModel();