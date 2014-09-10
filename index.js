'use strict';

function Policy(policy) {
  this.raw = policy;
  this.directives = [];

  var directives = this.raw.split(';');
  for (var i = 0; i < directives.length; ++i) {
    var directive = directives[i].trim();
    var tokens = directive.split(/\s+/);

    var name = tokens[0];
    if (!name) {
      continue;
    }
    var values = tokens.slice(1, tokens.length);
    this.directives[name] = values;
  }
  return this;
}

Policy.prototype.script = function() {
  return this.directives['script-src'];
};

Policy.prototype.get = function(directive) {
  return this.directives[directive];
};

Policy.prototype.add = function(directive, value) {
  if (!this.directives[directive]) {
    this.directives[directive] = [value];
  } else {
    this.directives[directive].push(value);
  }
  return this.directives[directive];
};

Policy.prototype.toString = function() {
  var out = '';
  for (var directive in this.directives) {
    out += directive + ' ' + this.directives[directive].join(' ') + '; ';
  }
  return out.trim();
};

exports.Policy = Policy;
