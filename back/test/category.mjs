import { expect } from 'chai';
import request from 'supertest';
import app from '../index.js';

describe('Category API', function () {
    let createdCategoryId;

    it('should create a new category', function (done) {
        request(app)
            .post('/api/category')
            .send({
                category_name: 'Test Category'
            })
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Create Category Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('category_id');
                createdCategoryId = res.body.category_id;
                done();
            });
    });

    it('should get all categories', function (done) {
        request(app)
            .get('/api/category')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Get All Categories Response:', res.body);
                expect(res.body).to.be.an('array');
                done();
            });
    });

    it('should get one category', function (done) {
        request(app)
            .get(`/api/category/${createdCategoryId}`)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Get One Category Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('category_id');
                expect(res.body.category_id).to.equal(createdCategoryId);
                done();
            });
    });

    it('should update a category', function (done) {
        request(app)
            .put('/api/category')
            .send({
                category_id: createdCategoryId,
                category_name: 'Updated Category'
            })
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Update Category Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('category_id');
                expect(res.body.category_id).to.equal(createdCategoryId);
                expect(res.body.category_name).to.equal('Updated Category');
                done();
            });
    });

    it('should delete a category', function (done) {
        request(app)
            .delete(`/api/category/${createdCategoryId}`)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Delete Category Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('category_id');
                expect(res.body.category_id).to.equal(createdCategoryId);
                done();
            });
    });
});