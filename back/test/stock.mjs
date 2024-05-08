import { expect } from 'chai';
import request from 'supertest';
import app from '../index.js';

describe('Stock API', function () {
    let createdStockId;

    it('should create a new stock', function (done) {
        const stockData = {
            product_name: 'Test Product',
            product_quantity: 10,
            id_category: 1,
        };

        request(app)
            .post('/api/stock')
            .send(stockData)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Create Stock Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('stock_id');
                createdStockId = res.body.stock_id;
                done();
            });
    });

    it('should get all stocks', function (done) {
        request(app)
            .get('/api/stock')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Get All Stocks Response:', res.body);
                expect(res.body).to.be.an('array');
                done();
            });
    });

    it('should get one stock', function (done) {
        request(app)
            .get(`/api/stock/${createdStockId}`)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Get One Stock Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('stock_id');
                expect(res.body.stock_id).to.equal(createdStockId);
                done();
            });
    });

    it('should update a stock', function (done) {
        const updatedStockData = {
            stock_id: createdStockId,
            product_name: 'Updated Test Product',
            product_quantity: 20,
            id_category: 2,
        };

        request(app)
            .put('/api/stock')
            .send(updatedStockData)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Update Stock Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('stock_id');
                expect(res.body.stock_id).to.equal(createdStockId);
                done();
            });
    });

    it('should delete a stock', function (done) {
        request(app)
            .delete(`/api/stock/${createdStockId}`)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Delete Stock Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('stock_id');
                expect(res.body.stock_id).to.equal(createdStockId);
                done();
            });
    });
});