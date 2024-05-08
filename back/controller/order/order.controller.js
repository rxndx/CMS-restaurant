const AbstractController = require('../AbstractController');
const OrderModel = require('../../model/order/order.model');

class OrderController extends AbstractController {
    constructor() {
        super(OrderModel);
    }
}

module.exports = new OrderController();