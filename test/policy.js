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
    policy.get('script').should.eql(['\'self\'']);
    done();
  });

  it('Should correctly add directives', function(done) {
    var policy = new csp.Policy(ExamplePolicy);
    policy.add('script-src', 'cdn.example.com');
    policy.get('script').should.eql(['\'self\'', 'cdn.example.com']);
    done();
  });

  it('Should correctly print out policies', function(done) {
    var policy = new csp.Policy(ExamplePolicy);
    policy.toString().should.eql(ExamplePolicy);
    done();
  });
});

describe('promote / demote', function() {
  it('should correctly promote directive', function(done) {
    var directive = 'script';
    csp.promote(directive).should.eql('script-src');
    done();
  });

  it('should return if already promoted', function(done) {
    var directive = 'script-src';
    csp.promote(directive).should.eql('script-src');
    done();
  });

  it('should correctly demote directive', function(done) {
    var directive = 'script-src';
    csp.demote(directive).should.eql('script');
    done();
  });

  it('should return if already demotex', function(done) {
    var directive = 'script';
    csp.demote(directive).should.eql('script');
    done();
  });
});
