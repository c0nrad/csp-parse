'use strict';

var should = require('should');
var csp = require('../index.js');

var ExamplePolicy = "default-src 'none'; script-src 'self'; connect-src 'self'; img-src 'self'; style-src 'self';";

describe('policy creation', function() {
  it('Should allow for new policies objects to be created', function(done) {
    var policy = new csp.Policy(ExamplePolicy);
    done();
  });

  it('Should correctly return directives', function(done) {
    var policy = new csp.Policy(ExamplePolicy);
    policy.script().should.eql(['\'self\'']);
    done();
  });

  it('Should correctly add directives', function(done) {
    var policy = new csp.Policy(ExamplePolicy);
    policy.add('script-src', 'cdn.example.com');
    policy.script().should.eql(['\'self\'', 'cdn.example.com']);
    done();
  });

  it('Should correctly print out policies', function(done) {
    var policy = new csp.Policy(ExamplePolicy);
    policy.toString().should.eql(ExamplePolicy);
    done();
  })
});
