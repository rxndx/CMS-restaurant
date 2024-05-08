import { expect } from 'chai';
import request from 'supertest';
import app from '../index.js';

describe('Tags API', function () {
    let createdTagId;

    it('should create a new tag', function (done) {
        const tagData = {
            tag_name: 'Test Tag',
            tag_content: 'Test Content',
        };

        request(app)
            .post('/api/tags')
            .send(tagData)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Create Tag Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('tag_id');
                createdTagId = res.body.tag_id;
                done();
            });
    });

    it('should get all tags', function (done) {
        request(app)
            .get('/api/tags')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Get All Tags Response:', res.body);
                expect(res.body).to.be.an('array');
                done();
            });
    });

    it('should get one tag', function (done) {
        request(app)
            .get(`/api/tags/${createdTagId}`)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Get One Tag Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('tag_id');
                expect(res.body.tag_id).to.equal(createdTagId);
                done();
            });
    });

    it('should update a tag', function (done) {
        const updatedTagData = {
            tag_id: createdTagId,
            tag_name: 'Updated Test Tag',
            tag_content: 'Updated Test Content',
        };

        request(app)
            .put('/api/tags')
            .send(updatedTagData)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Update Tag Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('tag_id');
                expect(res.body.tag_id).to.equal(createdTagId);
                done();
            });
    });

    it('should delete a tag', function (done) {
        request(app)
            .delete(`/api/tags/${createdTagId}`)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Delete Tag Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('tag_id');
                expect(res.body.tag_id).to.equal(createdTagId);
                done();
            });
    });
});