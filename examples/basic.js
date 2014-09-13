var csp = require('../index.js');

var example = "script-src 'self' www.google-analytics.com ajax.googleapis.com; style-src 'self';";
var policy = new csp.Policy(example);

policy.get('script'); // ["'self'", "www.google-analytics.com", "ajax.googleapis.com"]
policy.add('script', 'code.jquery.com');
policy.get('script'); // ["'self'", "www.google-analytics.com", "ajax.googleapis.com", "code.jquery.com"]

policy.toString(); // "script-src 'self' www.google-analytics.com ajax.googleapis.com code.jquery.com; style-src 'self';"
console.log(policy.toString());
