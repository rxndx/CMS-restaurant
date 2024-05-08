import { expect } from 'chai';
import request from 'supertest';
import app from '../index.js';

describe('Client API', function () {
    let createdAccountId;
    let createdCustomerId;

    it('should create a new account', function (done) {
        request(app)
            .post('/api/accounts')
            .send({
                id_brand: 1,
                email: 'test@example.com',
                surname: 'TestSurname',
                account_name: 'TestAccount',
                password_hash: 'hashedpassword',
                phone: '123456789'
            })
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Create Account Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('account_id');
                createdAccountId = res.body.account_id;
                done();
            });
    });

    it('should create a new customer', function (done) {
        request(app)
            .post('/api/customers')
            .send({
                address: 'Test Address',
                birthday: '2000-01-01',
                company: 'Test Company',
                position: 'Test Position',
                allergy: 'Test Allergy',
                dietary_restriction: 'Test Restriction',
                loyalty_points: 100,
                id_account: createdAccountId
            })
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Create Customer Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('customer_id');
                createdCustomerId = res.body.customer_id;
                done();
            });
    });

    it('should get all accounts', function (done) {
        request(app)
            .get('/api/accounts')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Get All Accounts Response:', res.body);
                expect(res.body).to.be.an('array');
                done();
            });
    });

    it('should get one account', function (done) {
        request(app)
            .get(`/api/accounts/${createdAccountId}`)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Get One Account Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('account_id');
                expect(res.body.account_id).to.equal(createdAccountId);
                done();
            });
    });

    it('should update an account', function (done) {
        request(app)
            .put('/api/accounts')
            .send({
                account_id: createdAccountId,
                id_brand: 2,
                email: 'updated@test.com',
                surname: 'UpdatedSurname',
                account_name: 'UpdatedAccount',
                password_hash: 'updatedhashedpassword',
                phone: '987654321'
            })
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Update Account Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('account_id');
                expect(res.body.account_id).to.equal(createdAccountId);
                done();
            });
    });

    it('should get all customers', function (done) {
        request(app)
            .get('/api/customers')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Get All Customers Response:', res.body);
                expect(res.body).to.be.an('array');
                done();
            });
    });

    it('should get one customer', function (done) {
        request(app)
            .get(`/api/customers/${createdCustomerId}`)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Get One Customer Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('customer_id');
                expect(res.body.customer_id).to.equal(createdCustomerId);
                done();
            });
    });

    it('should update a customer', function (done) {
        request(app)
            .put('/api/customers')
            .send({
                customer_id: createdCustomerId,
                address: 'Updated Address',
                birthday: '2000-02-02',
                company: 'Updated Company',
                position: 'Updated Position',
                allergy: 'Updated Allergy',
                dietary_restriction: 'Updated Restriction',
                loyalty_points: 200,
                id_account: createdAccountId
            })
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Update Customer Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('customer_id');
                expect(res.body.customer_id).to.equal(createdCustomerId);
                done();
            });
    });

    it('should delete a customer', function (done) {
        request(app)
            .delete(`/api/customers/${createdCustomerId}`)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Delete Customer Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('customer_id');
                expect(res.body.customer_id).to.equal(createdCustomerId);
                done();
            });
    });

    it('should delete an account', function (done) {
        request(app)
            .delete(`/api/accounts/${createdAccountId}`)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Delete Account Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('account_id');
                expect(res.body.account_id).to.equal(createdAccountId);
                done();
            });
    });
});