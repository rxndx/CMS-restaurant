import { expect } from 'chai';
import request from 'supertest';
import app from '../index.js';

describe('CatalogMenu API', function () {
    let createdCatalogMenuId;

    it('should create a new catalog menu', function (done) {
        request(app)
            .post('/api/catalog/menu')
            .send({
                id_menu: 1,
                id_catalog: 1
            })
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Create Catalog Menu Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('catalog_menu_id');
                createdCatalogMenuId = res.body.catalog_menu_id;
                done();
            });
    });

    it('should get all catalog menus', function (done) {
        request(app)
            .get('/api/catalog/menu')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Get All Catalog Menus Response:', res.body);
                expect(res.body).to.be.an('array');
                done();
            });
    });

    it('should get one catalog menu', function (done) {
        request(app)
            .get(`/api/catalog/menu/${createdCatalogMenuId}`)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) return done(err);

                console.log('Request URL:', `/api/catalog/menu/${createdCatalogMenuId}`);
                console.log('Response status:', res.status);
                console.log('Response body:', res.body);

                const responseBody = res.body;

                if (!responseBody) {
                    console.error('Response body is empty');
                    return done(new Error('Response body is empty'));
                }

                console.log('Get One Catalog Menu Response:', responseBody);

                expect(responseBody).to.be.an('object');
                expect(responseBody).to.have.property('catalog_menu_id');
                expect(responseBody.catalog_menu_id).to.equal(createdCatalogMenuId);

                done();
            });
    });

    it('should update a catalog menu', function (done) {
        request(app)
            .put('/api/catalog/menu')
            .send({
                catalog_menu_id: createdCatalogMenuId,
                id_menu: 2,
                id_catalog: 2
            })
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Update Catalog Menu Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('catalog_menu_id');
                expect(res.body.catalog_menu_id).to.equal(createdCatalogMenuId);
                done();
            });
    });

    it('should delete a catalog menu', function (done) {
        request(app)
            .delete(`/api/catalog/menu/${createdCatalogMenuId}`)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Delete Catalog Menu Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('catalog_menu_id');
                expect(res.body.catalog_menu_id).to.equal(createdCatalogMenuId);
                done();
            });
    });
});