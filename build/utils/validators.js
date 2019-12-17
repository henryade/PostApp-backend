"use strict";

require("core-js/modules/es.object.keys");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.match");

require("core-js/modules/es.string.trim");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateCommentInput = exports.validateLoginInput = exports.validateRegisterInput = void 0;

var validateRegisterInput = function validateRegisterInput(username, email, password, confirmPassword) {
  var errors = {};

  if (username.trim() === '') {
    errors.username = 'Username must not be empty';
  }

  if (email.trim() === '') {
    errors.email = 'Email must not be empty';
  } else {
    var regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

    if (!email.match(regEx)) {
      errors.email = 'Email must be a valid email address';
    }
  }

  if (password === '') {
    errors.password = 'Password must not empty';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords must match';
  }

  return {
    errors: errors,
    valid: Object.keys(errors).length < 1
  };
};

exports.validateRegisterInput = validateRegisterInput;

var validateLoginInput = function validateLoginInput(username, password) {
  var errors = {};

  if (username.trim() === '') {
    errors.username = 'Username must not be empty';
  }

  if (password.trim() === '') {
    errors.password = 'Password must not be empty';
  }

  return {
    errors: errors,
    valid: Object.keys(errors).length < 1
  };
};

exports.validateLoginInput = validateLoginInput;

var validateCommentInput = function validateCommentInput(body) {
  var errors = {};

  if (body.trim() === '') {
    errors.body = 'Comment body must not be empty';
  }

  return {
    errors: errors,
    valid: Object.keys(errors).length < 1
  };
};

exports.validateCommentInput = validateCommentInput;
//# sourceMappingURL=validators.js.map