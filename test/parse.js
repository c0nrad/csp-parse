'use strict';

var should = require('should');
var csp = require('../index.js');

var ExamplePolicy = "default-src 'none'; script-src 'self'; connect-src https: 'self'; img-src 'self'; style-src 'self';";

describe('policy creation', function() {
  it('Should allow for new policies objects to be created', function(done) {
    var policy = new csp.Policy(ExamplePolicy);
    done();
  });

  it('Should allow for empty policies to be created', function(done) {
    var policy = new csp.Policy();
    done();
  });

  it('should allow for pprint policies to be created', function(done) {
    var PPrintPolicy = "default-src\n\t'none';\nscript-src\n\t'self';\nconnect-src\n\thttps: 'self';\nimg-src\n\t'self';\nstyle-src\n\t'self';";
    var policy = new csp.Policy(ExamplePolicy);
    policy.get('script-src').should.eql('\'self\'');
    policy.get('connect-src').should.eql('https: \'self\'');
    done();
  });

  it('Should correctly return directives', function(done) {
    var policy = new csp.Policy(ExamplePolicy);
    policy.get('script-src').should.eql('\'self\'');
    policy.get('connect-src').should.eql('https: \'self\'');
    done();
  });

  it('Should handle casing correctly', function(done) {
    var policy = new csp.Policy(ExamplePolicy.toUpperCase());
    policy.get('script-src').should.eql('\'self\'');
    done();
  });

  it('Should return an empty string if directive doesnt exist', function(done) {
    var policy = new csp.Policy(ExamplePolicy);
    policy.get('child').should.eql('');
    done();
  });

  it('Should correctly print out policies PRINT', function(done) {
    var policy = new csp.Policy(ExamplePolicy);
    policy.toString().should.eql(ExamplePolicy);
    done();
  });

  it('Should correctly pretty print out policies PPRINT', function(done) {
    var policy = new csp.Policy(ExamplePolicy);
    var out = "default-src\n\t'none';\nscript-src\n\t'self';\nconnect-src\n\thttps: 'self';\nimg-src\n\t'self';\nstyle-src\n\t'self';";
    policy.pprint().should.eql(out);
    done();
  });
});

describe('policy modification', function() {

  it('should correcty allow you to set a directive SET', function(done) {
    var policy = new csp.Policy(ExamplePolicy);
    policy.set('script-src', 'google.com cdn.example.com');
    policy.get('script-src').should.eql('google.com cdn.example.com');
    done();
  });

  it('Should correctly add sources to directives ADD', function(done) {
    var policy = new csp.Policy(ExamplePolicy);
    policy.add('script-src', 'cdn.example.com');
    policy.get('script-src').should.eql('\'self\' cdn.example.com');
    done();
  });

  it('Should correctly remove sources from directive REMOVE', function(done) {
    var policy = new csp.Policy(ExamplePolicy);
    policy.remove('connect-src', 'https:');
    policy.get('connect-src').should.eql('\'self\'');
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
