var crunchbase = require('crunchbase-node')('3tdkr9vxr7hbn4fyt34bkk3v')
    , request = require('request')
    , _ = require('lodash');

describe('CrunchBase Test Suite', function() {
    it('should load it successfully', function(done) {
        expect(crunchbase).not.toBe(null);
        done();
    });

    it('should fetch entity successfully', function(done) {
        crunchbase.entity('company', 'dropbox', function(err, body) {
            expect(err).toBe(null);
            expect(body).not.toBe(null);
            expect(typeof body).toBe('string');
            body = JSON.parse(body);
            expect(body.name).toBe('Dropbox');
            done();
        });
    });

    it('should fetch entities successfully', function(done) {
        crunchbase.entities('companies', function(err, body) {
            expect(err).toBe(null);
            expect(body).not.toBe(null);
            expect(typeof body).toBe('string');
            done();
        });
    });

    it('should search by query', function(done) {
        crunchbase.search({
            query: 'instagram'
        }, function(err, body) {
            expect(err).toBe(null);
            expect(body).not.toBe(null);
            expect(typeof body).toBe('string');
            body = JSON.parse(body);
            expect(body.total).toBeGreaterThan(0);
            expect(_.isArray(body.results)).toBeTruthy();
            done();
        })
    });

    it('should search by query & entity', function(done) {
        crunchbase.search({
            query: 'instagram',
            entity: 'company'
        }, function(err, body) {
            expect(err).toBe(null);
            expect(body).not.toBe(null);
            expect(typeof body).toBe('string');
            body = JSON.parse(body);
            expect(_.isArray(body.results)).toBeTruthy();
            done();
        });
    });

    it('should search by query, entity and field', function(done) {
        crunchbase.search({
            query: 'instagram',
            entity: 'company',
            field: 'homepage_url'
        }, function(err, body) {
            expect(err).toBe(null);
            expect(body).not.toBe(null);
            expect(typeof body).toBe('string');
            done();
        });
    });
});