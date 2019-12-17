"use strict";

require("core-js/modules/es.array.find-index");

require("core-js/modules/es.array.splice");

require("core-js/modules/es.date.to-iso-string");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("regenerator-runtime/runtime");

var _apolloServer = require("apollo-server");

var _models = require("../../models");

var _utils = require("../../utils");

var _default = {
  Mutation: {
    createComment: function createComment(parent, _ref, context) {
      var postId, body, _verifyToken, username, _validateCommentInput, errors, valid, post;

      return regeneratorRuntime.async(function createComment$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              postId = _ref.postId, body = _ref.body;
              _verifyToken = (0, _utils.verifyToken)(context), username = _verifyToken.username;
              _validateCommentInput = (0, _utils.validateCommentInput)(body), errors = _validateCommentInput.errors, valid = _validateCommentInput.valid;

              if (valid) {
                _context.next = 5;
                break;
              }

              throw new _apolloServer.UserInputError('Empty Comment', {
                errors: errors
              });

            case 5:
              _context.next = 7;
              return regeneratorRuntime.awrap(_models.Post.findById(postId));

            case 7:
              post = _context.sent;

              if (!post) {
                _context.next = 15;
                break;
              }

              post.comments.unshift({
                body: body,
                username: username,
                createdAt: new Date().toISOString()
              });
              _context.next = 12;
              return regeneratorRuntime.awrap(post.save());

            case 12:
              return _context.abrupt("return", post);

            case 15:
              throw new _apolloServer.UserInputError('Post Not Found');

            case 16:
            case "end":
              return _context.stop();
          }
        }
      });
    },
    deleteComment: function deleteComment(parent, _ref2, context) {
      var postId, commentId, _verifyToken2, username, post, commentIndex;

      return regeneratorRuntime.async(function deleteComment$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              postId = _ref2.postId, commentId = _ref2.commentId;
              _verifyToken2 = (0, _utils.verifyToken)(context), username = _verifyToken2.username;
              _context2.next = 4;
              return regeneratorRuntime.awrap(_models.Post.findById(postId));

            case 4:
              post = _context2.sent;

              if (!post) {
                _context2.next = 21;
                break;
              }

              commentIndex = post.comments.findIndex(function (_ref3) {
                var id = _ref3.id;
                return id === commentId;
              });

              if (!post.comments[commentIndex]) {
                _context2.next = 18;
                break;
              }

              if (!(post.comments[commentIndex].username === username)) {
                _context2.next = 15;
                break;
              }

              post.comments.splice(commentIndex, 1);
              _context2.next = 12;
              return regeneratorRuntime.awrap(post.save());

            case 12:
              return _context2.abrupt("return", post);

            case 15:
              throw new _apolloServer.AuthenticationError('Action Not Allowed');

            case 16:
              _context2.next = 19;
              break;

            case 18:
              throw new _apolloServer.UserInputError('Comment Not Found');

            case 19:
              _context2.next = 22;
              break;

            case 21:
              throw new _apolloServer.UserInputError('Post Not Found');

            case 22:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }
};
exports["default"] = _default;
//# sourceMappingURL=comments.js.map