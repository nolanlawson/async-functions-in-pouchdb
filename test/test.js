/*jshint expr:true */
'use strict';

var theLib = require('../lib');

var chai = require('chai');
chai.use(require("chai-as-promised"));

var should = chai.should(); // var should = chai.should();

tests();

function tests() {

  beforeEach(function () {
  });
  afterEach(function () {
  });
  describe('basic tests', function () {

    it('should do stuff', function () {
      should.exist(theLib);
      return Promise.resolve(true);
    });
  });
}
