import { expect } from 'chai';
import request from 'supertest';
import app from '../index.js';

describe('Review API', function () {
    let createdReviewId;

    it('should create a new review', function (done) {
        const reviewData = {
            id_customer: 1,
            comment: 'Great food!',
            id_menu_item: 1,
            rating: 5
        };

        request(app)
            .post('/api/review')
            .send(reviewData)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Create Review Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('review_id');
                createdReviewId = res.body.review_id;
                done();
            });
    });

    it('should get all reviews', function (done) {
        request(app)
            .get('/api/review')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Get All Reviews Response:', res.body);
                expect(res.body).to.be.an('array');
                done();
            });
    });

    it('should get one review', function (done) {
        request(app)
            .get(`/api/review/${createdReviewId}`)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Get One Review Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('review_id');
                expect(res.body.review_id).to.equal(createdReviewId);
                done();
            });
    });

    it('should update a review', function (done) {
        const updatedReviewData = {
            review_id: createdReviewId,
            id_customer: 2,
            comment: 'Excellent service!',
            id_menu_item: 2,
            rating: 4
        };

        request(app)
            .put('/api/review')
            .send(updatedReviewData)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Update Review Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('review_id');
                expect(res.body.review_id).to.equal(createdReviewId);
                done();
            });
    });

    it('should delete a review', function (done) {
        request(app)
            .delete(`/api/review/${createdReviewId}`)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Delete Review Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('review_id');
                expect(res.body.review_id).to.equal(createdReviewId);
                done();
            });
    });
});