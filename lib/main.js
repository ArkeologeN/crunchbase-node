/**
 * @author  Hamza Waqas <hamzawaqas@live.com>
 * @since   12/19/13
 */

var config = require('../config')
    , _ = require('lodash')
    , format = require('util').format
    , url = require('url')
    , request = require('request');

var Main = function(appKey) {

    this.createCall = function(method, url, options, cb) {
        var parameters = {};

        if (_.isFunction(options)) {
            cb = options;
            options = {};
        }

        parameters = {
            url: format(config.api_url + "%s", url),
            method: method
        };

        request(parameters, function(err, response, body) {
            return cb(err, body);
        });
    };

    this.entity = function(type, name, cb) {
        this.createCall('GET', format('%s/%s.js?api_key=%s', type, name, appKey), cb);
    };

    this.entities = function(type, cb) {
        this.createCall('GET', format('%s.js?limit=20&api_key=%s', type, appKey), cb);
    };

    this.search = function(options,  cb) {;
        this.createCall('GET', url.format({
            pathname: 'search.js',
            query: _.merge(options, {api_key: appKey})
        }), cb);
    };

    this.posts = function(type, name, fname, lname, cb) {
        this.createCall('GET', format('%s/posts?name=%s&first_name=%s&last_name=%s&api_key=%s', type, name, fname, lname, appKey), cb);
    };

    return this;

}.bind(this);

module.exports = Main;