import { expect } from 'chai';
import request from 'supertest';
import app from '../index.js';

describe('Menu API', function () {
    let createdMenuId;

    it('should create a new menu', function (done) {
        request(app)
            .post('/api/menu')
            .send({
                menu_name: 'TestMenu',
                menu_content: 'Test Menu Content',
                menu_image_path: '/images/test-menu.jpg'
            })
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Create Menu Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('menu_id');
                createdMenuId = res.body.menu_id;
                done();
            });
    });

    it('should get all menus', function (done) {
        request(app)
            .get('/api/menu')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Get All Menus Response:', res.body);
                expect(res.body).to.be.an('array');
                done();
            });
    });

    it('should get one menu', function (done) {
        request(app)
            .get(`/api/menu/${createdMenuId}`)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Get One Menu Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('menu_id');
                expect(res.body.menu_id).to.equal(createdMenuId);
                done();
            });
    });

    it('should update a menu', function (done) {
        request(app)
            .put('/api/menu')
            .send({
                menu_id: createdMenuId,
                menu_name: 'UpdatedTestMenu',
                menu_content: 'Updated Test Menu Content',
                menu_image_path: '/images/updated-menu.jpg'
            })
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Update Menu Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('menu_id');
                expect(res.body.menu_id).to.equal(createdMenuId);
                done();
            });
    });

    it('should delete a menu', function (done) {
        request(app)
            .delete(`/api/menu/${createdMenuId}`)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Delete Menu Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('menu_id');
                expect(res.body.menu_id).to.equal(createdMenuId);
                done();
            });
    });
});