import { expect } from 'chai';
import request from 'supertest';
import app from '../index.js';

describe('Design API', function () {
    let createdDesignId;

    it('should create a new design', function (done) {
        request(app)
            .post('/api/design')
            .send({
                design_type: 'TestDesign',
                file_path: '/path/to/test/design'
            })
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Create Design Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('design_id');
                createdDesignId = res.body.design_id;
                done();
            });
    });

    it('should get all designs', function (done) {
        request(app)
            .get('/api/design')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Get All Designs Response:', res.body);
                expect(res.body).to.be.an('array');
                done();
            });
    });

    it('should get one design', function (done) {
        request(app)
            .get(`/api/design/${createdDesignId}`)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Get One Design Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('design_id');
                expect(res.body.design_id).to.equal(createdDesignId);
                done();
            });
    });

    it('should update a design', function (done) {
        request(app)
            .put('/api/design')
            .send({
                design_id: createdDesignId,
                design_type: 'UpdatedDesign',
                file_path: '/path/to/updated/design'
            })
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Update Design Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('design_id');
                expect(res.body.design_id).to.equal(createdDesignId);
                done();
            });
    });

    it('should delete a design', function (done) {
        request(app)
            .delete(`/api/design/${createdDesignId}`)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Delete Design Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('design_id');
                expect(res.body.design_id).to.equal(createdDesignId);
                done();
            });
    });
});