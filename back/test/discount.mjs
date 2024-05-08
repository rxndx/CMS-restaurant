// TODO: нужно будет тестирование для работы скидочной системы

import { expect } from 'chai';
import request from 'supertest';
import app from '../index.js';

describe('Discount API', function () {
    let createdDiscountId;

    it('should create a new discount', function (done) {
        request(app)
            .post('/api/discount')
            .send({
                discount_name: 'TestDiscount',
                discount_percent: 10,
                id_menu: 1
            })
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Create Discount Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('discount_id');
                createdDiscountId = res.body.discount_id;
                done();
            });
    });

    it('should get all discounts', function (done) {
        request(app)
            .get('/api/discount')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Get All Discounts Response:', res.body);
                expect(res.body).to.be.an('array');
                done();
            });
    });

    it('should get one discount', function (done) {
        request(app)
            .get(`/api/discount/${createdDiscountId}`)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Get One Discount Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('discount_id');
                expect(res.body.discount_id).to.equal(createdDiscountId);
                done();
            });
    });

    it('should update a discount', function (done) {
        request(app)
            .put('/api/discount')
            .send({
                discount_id: createdDiscountId,
                discount_name: 'UpdatedTestDiscount',
                discount_percent: 15,
                id_menu: 2
            })
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Update Discount Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('discount_id');
                expect(res.body.discount_id).to.equal(createdDiscountId);
                done();
            });
    });

    it('should delete a discount', function (done) {
        request(app)
            .delete(`/api/discount/${createdDiscountId}`)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Delete Discount Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('discount_id');
                expect(res.body.discount_id).to.equal(createdDiscountId);
                done();
            });
    });
});