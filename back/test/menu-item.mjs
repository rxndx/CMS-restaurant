import { expect } from 'chai';
import request from 'supertest';
import app from '../index.js';

describe('MenuItem API', function () {
    let createdMenuItemId;

    it('should create a new menu item', function (done) {
        request(app)
            .post('/api/dish')
            .send({
                menu_item_name: 'TestMenuItem',
                menu_item_content: 'Test Menu Item Content',
                id_menu: 1,
                price: 9.99
            })
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Create MenuItem Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('menu_item_id');
                createdMenuItemId = res.body.menu_item_id;
                done();
            });
    });

    it('should get all menu items', function (done) {
        request(app)
            .get('/api/dish')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Get All Menu Items Response:', res.body);
                expect(res.body).to.be.an('array');
                done();
            });
    });

    it('should get one menu item', function (done) {
        request(app)
            .get(`/api/dish/${createdMenuItemId}`)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Get One Menu Item Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('menu_item_id');
                expect(res.body.menu_item_id).to.equal(createdMenuItemId);
                done();
            });
    });

    it('should update a menu item', function (done) {
        request(app)
            .put('/api/dish')
            .send({
                menu_item_id: createdMenuItemId,
                menu_item_name: 'UpdatedTestMenuItem',
                menu_item_content: 'Updated Test Menu Item Content',
                id_menu: 2,
                price: 12.99
            })
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Update MenuItem Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('menu_item_id');
                expect(res.body.menu_item_id).to.equal(createdMenuItemId);
                done();
            });
    });

    it('should delete a menu item', function (done) {
        request(app)
            .delete(`/api/dish/${createdMenuItemId}`)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Delete MenuItem Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('menu_item_id');
                expect(res.body.menu_item_id).to.equal(createdMenuItemId);
                done();
            });
    });
});