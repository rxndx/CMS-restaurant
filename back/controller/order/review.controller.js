const AbstractController = require('../AbstractController');
const ReviewModel = require('../../model/order/review.model');

class ReviewController extends AbstractController {
    constructor() {
        super(ReviewModel);
    }
}

module.exports = new ReviewController();