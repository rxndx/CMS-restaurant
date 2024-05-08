// TODO: нужно будет тестирование для работы бонусной системы

import { expect } from 'chai';
import request from 'supertest';
import app from '../index.js';

describe('Bonus API', function () {
    let createdBonusId;

    it('should create a new bonus', function (done) {
        request(app)
            .post('/api/bonus')
            .send({
                bonus_name: 'TestBonus',
                bonus_content: 'Test Bonus Content',
                bonus_score: 50,
                id_item_menu: 1
            })
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Create Bonus Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('bonus_id');
                createdBonusId = res.body.bonus_id;
                done();
            });
    });

    it('should get all bonuses', function (done) {
        request(app)
            .get('/api/bonus')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Get All Bonuses Response:', res.body);
                expect(res.body).to.be.an('array');
                done();
            });
    });

    it('should get one bonus', function (done) {
        request(app)
            .get(`/api/bonus/${createdBonusId}`)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Get One Bonus Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('bonus_id');
                expect(res.body.bonus_id).to.equal(createdBonusId);
                done();
            });
    });

    it('should update a bonus', function (done) {
        request(app)
            .put('/api/bonus')
            .send({
                bonus_id: createdBonusId,
                bonus_name: 'UpdatedTestBonus',
                bonus_content: 'Updated Test Bonus Content',
                bonus_score: 75,
                id_item_menu: 2
            })
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Update Bonus Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('bonus_id');
                expect(res.body.bonus_id).to.equal(createdBonusId);
                done();
            });
    });

    it('should delete a bonus', function (done) {
        request(app)
            .delete(`/api/bonus/${createdBonusId}`)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Delete Bonus Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('bonus_id');
                expect(res.body.bonus_id).to.equal(createdBonusId);
                done();
            });
    });
});