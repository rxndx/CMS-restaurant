import { expect } from 'chai';
import request from 'supertest';
import app from '../index.js';

describe('Product API', function () {
    let createdProductId;

    it('should create a new product', function (done) {
        const productData = {
            id_stock: 1,
            id_item_menu: 1,
        };

        request(app)
            .post('/api/product')
            .send(productData)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Create Product Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('product_id');
                createdProductId = res.body.product_id;
                done();
            });
    });

    it('should get all products', function (done) {
        request(app)
            .get('/api/product')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Get All Products Response:', res.body);
                expect(res.body).to.be.an('array');
                done();
            });
    });

    it('should get one product', function (done) {
        request(app)
            .get(`/api/product/${createdProductId}`)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Get One Product Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('product_id');
                expect(res.body.product_id).to.equal(createdProductId);
                done();
            });
    });

    it('should update a product', function (done) {
        const updatedProductData = {
            product_id: createdProductId,
            id_stock: 2,
            id_item_menu: 2,
        };

        request(app)
            .put('/api/product')
            .send(updatedProductData)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Update Product Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('product_id');
                expect(res.body.product_id).to.equal(createdProductId);
                done();
            });
    });

    it('should delete a product', function (done) {
        request(app)
            .delete(`/api/product/${createdProductId}`)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Delete Product Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('product_id');
                expect(res.body.product_id).to.equal(createdProductId);
                done();
            });
    });
});