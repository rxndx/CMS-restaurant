import { expect } from 'chai';
import request from 'supertest';
import app from '../index.js';

describe('Food Tags API', function () {
    let createdFoodTagId;

    it('should create a new food tag', function (done) {
        const foodTagData = {
            id_item_menu: 1,
            id_tags: 1,
        };

        request(app)
            .post('/api/tags/food')
            .send(foodTagData)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Create Food Tag Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('food_tags_id');
                createdFoodTagId = res.body.food_tags_id;
                done();
            });
    });

    it('should get all food tags', function (done) {
        request(app)
            .get('/api/tags/food')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Get All Food Tags Response:', res.body);
                expect(res.body).to.be.an('array');
                done();
            });
    });

    it('should get one food tag', function (done) {
        request(app)
            .get(`/api/tags/food/${createdFoodTagId}`)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Get One Food Tag Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('food_tags_id');
                expect(res.body.food_tags_id).to.equal(createdFoodTagId);
                done();
            });
    });

    it('should update a food tag', function (done) {
        const updatedFoodTagData = {
            food_tags_id: createdFoodTagId,
            id_item_menu: 2,
            id_tags: 2,
        };

        request(app)
            .put('/api/tags/food')
            .send(updatedFoodTagData)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Update Food Tag Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('food_tags_id');
                expect(res.body.food_tags_id).to.equal(createdFoodTagId);
                done();
            });
    });

    it('should delete a food tag', function (done) {
        request(app)
            .delete(`/api/tags/food/${createdFoodTagId}`)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Delete Food Tag Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('food_tags_id');
                expect(res.body.food_tags_id).to.equal(createdFoodTagId);
                done();
            });
    });
});