var util = require('../lib/util.js');
var assert = require('chai').assert;

describe('Utility functions', function() {
  describe('isFile()', function () {
    it('should return true if specified path is a file', function() {
      var result = util.isFile('test/fixture/single.json');
      assert.equal(result, true);
    });
    it('should return false if specified path is not a file', function() {
      var result = util.isFile('test/fixture/not_exist.json');
      assert.equal(result, false);
    });
  });
});
