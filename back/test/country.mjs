import { expect } from 'chai';
import request from 'supertest';
import app from '../index.js';

describe('Country API', function () {
    let createdCountryId;

    it('should create a new country', function (done) {
        request(app)
            .post('/api/country')
            .send({
                country_name: 'TestCountry'
            })
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Create Country Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('country_id');
                createdCountryId = res.body.country_id;
                done();
            });
    });

    it('should get all countries', function (done) {
        request(app)
            .get('/api/country')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Get All Countries Response:', res.body);
                expect(res.body).to.be.an('array');
                done();
            });
    });

    it('should get one country', function (done) {
        request(app)
            .get(`/api/country/${createdCountryId}`)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Get One Country Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('country_id');
                expect(res.body.country_id).to.equal(createdCountryId);
                done();
            });
    });

    it('should update a country', function (done) {
        request(app)
            .put('/api/country')
            .send({
                country_id: createdCountryId,
                country_name: 'UpdatedCountry'
            })
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Update Country Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('country_id');
                expect(res.body.country_id).to.equal(createdCountryId);
                done();
            });
    });

    it('should delete a country', function (done) {
        request(app)
            .delete(`/api/country/${createdCountryId}`)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Delete Country Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('country_id');
                expect(res.body.country_id).to.equal(createdCountryId);
                done();
            });
    });
});