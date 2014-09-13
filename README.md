# csp-parse

NodeJS module for parsing content-security-policy policies.

## Installation

```
npm install csp-parse
```

## Usage

```javascript
var csp = require('csp-parse');

var example = "script-src 'self' www.google-analytics.com ajax.googleapis.com; style-src 'self';"
var policy = new csp.Policy(example)

policy.get('script') // ["'self'", "www.google-analytics.com", "ajax.googleapis.com"]
policy.add('script', 'code.jquery.com');
policy.get('script') // ["'self'", "www.google-analytics.com", "ajax.googleapis.com", "code.jquery.com"]

policy.toString() // "script-src 'self' www.google-analytics.com ajax.googleapis.com code.jquery.com; style-src 'self';"
```

## API

### csp.parse(string)
  Takes a CSP policy and returns a Policy object.

### Policy.script()
  Returns a list of allow script origins

### Policy.add(string directive, string value)
  Adds value to the directive list for the policy

## Test

```
mocha
```

/brain explodes

## Contact

c0nrad@c0nrad.io
