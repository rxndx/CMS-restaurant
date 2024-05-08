import { expect } from 'chai';
import request from 'supertest';
import app from '../index.js';

describe('Order API', function () {
    let createdOrderId;

    it('should create a new order', function (done) {
        const currentDate = new Date().toISOString().slice(0, 10);
        const orderData = {
            id_client: 1,
            status: 'Pending',
            price: 20.99,
            receipt_date: currentDate,
            completed_date: null
        };

        request(app)
            .post('/api/orders')
            .send(orderData)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Create Order Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('order_id');
                createdOrderId = res.body.order_id;
                done();
            });
    });

    it('should get all orders', function (done) {
        request(app)
            .get('/api/orders')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Get All Orders Response:', res.body);
                expect(res.body).to.be.an('array');
                done();
            });
    });

    it('should get one order', function (done) {
        request(app)
            .get(`/api/orders/${createdOrderId}`)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Get One Order Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('order_id');
                expect(res.body.order_id).to.equal(createdOrderId);
                done();
            });
    });

    it('should update an order', function (done) {
        const currentDate = new Date().toISOString().slice(0, 10);
        const updatedOrderData = {
            id_client: 2,
            status: 'Completed',
            price: 25.99,
            receipt_date: currentDate,
            completed_date: currentDate,
            order_id: createdOrderId
        };

        request(app)
            .put('/api/orders')
            .send(updatedOrderData)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Update Order Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('order_id');
                expect(res.body.order_id).to.equal(createdOrderId);
                done();
            });
    });

    it('should delete an order', function (done) {
        request(app)
            .delete(`/api/orders/${createdOrderId}`)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Delete Order Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('order_id');
                expect(res.body.order_id).to.equal(createdOrderId);
                done();
            });
    });
});