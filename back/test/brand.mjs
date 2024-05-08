import { expect } from 'chai';
import request from 'supertest';

import app from '../index.js';

describe('Brand API', function () {
    let createdBrandId;

    it('should create a new brand', function (done) {
        request(app)
            .post('/api/brand')
            .send({ brand_name: 'Test Brand', id_design: 1 })
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Create Brand Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('brand_id');
                createdBrandId = res.body.brand_id;
                done();
            });
    });

    it('should get all brands', function (done) {
        request(app)
            .get('/api/brand')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Get All Brands Response:', res.body);
                expect(res.body).to.be.an('array');
                done();
            });
    });

    it('should get one brand', function (done) {
        request(app)
            .get(`/api/brand/${createdBrandId}`)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Get One Brand Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('brand_id');
                expect(res.body.brand_id).to.equal(createdBrandId);
                done();
            });
    });

    it('should update a brand', function (done) {
        request(app)
            .put('/api/brand')
            .send({ brand_id: createdBrandId, brand_name: 'Updated Brand Name', id_design: 2 })
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Update Brand Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('brand_id');
                expect(res.body.brand_id).to.equal(createdBrandId);
                expect(res.body.brand_name).to.equal('Updated Brand Name');
                done();
            });
    });

    it('should delete a brand', function (done) {
        request(app)
            .delete(`/api/brand/${createdBrandId}`)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Delete Brand Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('brand_id');
                expect(res.body.brand_id).to.equal(createdBrandId);
                done();
            });
    });
});