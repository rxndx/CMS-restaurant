const AbstractController = require('../AbstractController');
const OrderItemModel = require('../../model/order/order-item.model');

class OrderItemController extends AbstractController {
    constructor() {
        super(OrderItemModel);
    }
}

module.exports = new OrderItemController();