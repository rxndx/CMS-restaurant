import { expect } from 'chai';
import request from 'supertest';
import app from '../index.js';

describe('Menu Tags API', function () {
    let createdMenuTagId;

    it('should create a new menu tag', function (done) {
        const menuTagData = {
            id_menu: 1,
            id_tags: 1,
        };

        request(app)
            .post('/api/tags/menu')
            .send(menuTagData)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Create Menu Tag Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('menu_tags_id');
                createdMenuTagId = res.body.menu_tags_id;
                done();
            });
    });

    it('should get all menu tags', function (done) {
        request(app)
            .get('/api/tags/menu')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Get All Menu Tags Response:', res.body);
                expect(res.body).to.be.an('array');
                done();
            });
    });

    it('should get one menu tag', function (done) {
        request(app)
            .get(`/api/tags/menu/${createdMenuTagId}`)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Get One Menu Tag Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('menu_tags_id');
                expect(res.body.menu_tags_id).to.equal(createdMenuTagId);
                done();
            });
    });

    it('should update a menu tag', function (done) {
        const updatedMenuTagData = {
            menu_tags_id: createdMenuTagId,
            id_menu: 2,
            id_tags: 2,
        };

        request(app)
            .put('/api/tags/menu')
            .send(updatedMenuTagData)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Update Menu Tag Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('menu_tags_id');
                expect(res.body.menu_tags_id).to.equal(createdMenuTagId);
                done();
            });
    });

    it('should delete a menu tag', function (done) {
        request(app)
            .delete(`/api/tags/menu/${createdMenuTagId}`)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Delete Menu Tag Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('menu_tags_id');
                expect(res.body.menu_tags_id).to.equal(createdMenuTagId);
                done();
            });
    });
});