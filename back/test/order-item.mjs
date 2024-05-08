import { expect } from 'chai';
import request from 'supertest';
import app from '../index.js';

describe('OrderItem API', function () {
    let createdOrderItemId;

    it('should create a new order item', function (done) {
        const orderItemData = {
            id_order: 1,
            id_menu_item: 1,
            quantity: 2
        };

        request(app)
            .post('/api/choices')
            .send(orderItemData)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Create Order Item Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('order_item_id');
                createdOrderItemId = res.body.order_item_id;
                done();
            });
    });

    it('should get all order items', function (done) {
        request(app)
            .get('/api/choices')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Get All Order Items Response:', res.body);
                expect(res.body).to.be.an('array');
                done();
            });
    });

    it('should get one order item', function (done) {
        request(app)
            .get(`/api/choices/${createdOrderItemId}`)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Get One Order Item Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('order_item_id');
                expect(res.body.order_item_id).to.equal(createdOrderItemId);
                done();
            });
    });

    it('should update an order item', function (done) {
        const updatedOrderItemData = {
            order_item_id: createdOrderItemId,
            id_order: 2,
            id_menu_item: 2,
            quantity: 3
        };

        request(app)
            .put('/api/choices')
            .send(updatedOrderItemData)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Update Order Item Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('order_item_id');
                expect(res.body.order_item_id).to.equal(createdOrderItemId);
                done();
            });
    });

    it('should delete an order item', function (done) {
        request(app)
            .delete(`/api/choices/${createdOrderItemId}`)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Delete Order Item Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('order_item_id');
                expect(res.body.order_item_id).to.equal(createdOrderItemId);
                done();
            });
    });
});