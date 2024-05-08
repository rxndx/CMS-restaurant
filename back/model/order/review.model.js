const db = require('../../db');

class ReviewModel {
    async create(reviewData) {
        try {
            const { id_customer, comment, id_menu_item, rating } = reviewData;
            const newReview = await db.query(`
                INSERT INTO "REVIEW" (id_customer, comment, id_menu_item, rating)
                VALUES ($1, $2, $3, $4) RETURNING *
            `, [id_customer, comment, id_menu_item, rating]);
            return newReview.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            const reviews = await db.query('SELECT * FROM "REVIEW"');
            return reviews.rows;
        } catch (error) {
            throw error;
        }
    }

    async getOne(id) {
        try {
            const oneReview = await db.query('SELECT * FROM "REVIEW" WHERE review_id = $1', [id]);
            return oneReview.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async update(reviewData) {
        try {
            const { review_id, id_customer, comment, id_menu_item, rating } = reviewData;
            const updatedReview = await db.query(`
                UPDATE "REVIEW" SET id_customer = $1, comment = $2, id_menu_item = $3,
                                   rating = $4
                WHERE review_id = $5 RETURNING *
            `, [id_customer, comment, id_menu_item, rating, review_id]);
            return updatedReview.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            const deletedReview = await db.query('DELETE FROM "REVIEW" WHERE review_id = $1 RETURNING *', [id]);
            return deletedReview.rows[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ReviewModel();