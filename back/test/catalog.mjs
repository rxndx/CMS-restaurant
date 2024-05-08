import { expect } from 'chai';
import request from 'supertest';
import app from '../index.js';

describe('Catalog API', function () {
    let createdCatalogId;

    it('should create a new catalog', function (done) {
        request(app)
            .post('/api/catalog')
            .send({
                catalogs_name: 'Test Catalog',
                catalog_content: 'Test Content',
                id_country: 1,
                id_brand: 1
            })
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Create Catalog Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('catalog_id');
                createdCatalogId = res.body.catalog_id;
                done();
            });
    });

    it('should get all catalogs', function (done) {
        request(app)
            .get('/api/catalog')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Get All Catalogs Response:', res.body);
                expect(res.body).to.be.an('array');
                done();
            });
    });

    it('should get one catalog', function (done) {
        request(app)
            .get(`/api/catalog/${createdCatalogId}`)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Get One Catalog Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('catalog_id');
                expect(res.body.catalog_id).to.equal(createdCatalogId);
                done();
            });
    });

    it('should update a catalog', function (done) {
        request(app)
            .put('/api/catalog')
            .send({
                catalog_id: createdCatalogId,
                catalogs_name: 'Updated Catalog',
                catalog_content: 'Updated Content',
                id_country: 2,
                id_brand: 2
            })
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Update Catalog Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('catalog_id');
                expect(res.body.catalog_id).to.equal(createdCatalogId);
                expect(res.body.catalogs_name).to.equal('Updated Catalog');
                done();
            });
    });

    it('should delete a catalog', function (done) {
        request(app)
            .delete(`/api/catalog/${createdCatalogId}`)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Delete Catalog Response:', res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('catalog_id');
                expect(res.body.catalog_id).to.equal(createdCatalogId);
                done();
            });
    });
});
