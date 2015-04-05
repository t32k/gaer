var util = require('../lib/util.js');
var Validator = require('../lib/validator');
var expect = require('chai').expect;

describe('Utility functions', function() {
  describe('isFile()', function () {
    it('should return true if specified path is a file', function() {
      var result = util.isFile('test/fixture/single.json');
      expect(result).to.be.true;
    });
    it('should return false if specified path is not a file', function() {
      var result = util.isFile('test/fixture/not_exist.json');
      expect(result).to.be.false;
    });
  });
  describe('parseJSON()', function () {
    it('should return object if it is JSON strings', function() {
      var result = util.parseJSON('{"foo": 1}');
      expect(result).to.be.ok;
    });
  });
});

describe('Validator class', function() {
  it('should return object if arguments are every correct', function() {
    var result = new Validator('UA-1234-56', 'foo', '{"foo": 1}').validate();
    expect(result).to.be.ok;
  });
});
