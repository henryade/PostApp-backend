"use strict";

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.find");

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
    likePost: function likePost(parent, _ref, context) {
      var postId, _ref2, username, post, like;

      return regeneratorRuntime.async(function likePost$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              postId = _ref.postId;
              _context.next = 3;
              return regeneratorRuntime.awrap((0, _utils.verifyToken)(context));

            case 3:
              _ref2 = _context.sent;
              username = _ref2.username;
              _context.next = 7;
              return regeneratorRuntime.awrap(_models.Post.findById(postId));

            case 7:
              post = _context.sent;

              if (!post) {
                _context.next = 16;
                break;
              }

              like = post.likes.find(function (like) {
                return like.username === username;
              });

              if (like) {
                post.likes = post.likes.filter(function (like) {
                  return like.username !== username;
                });
              } else {
                post.likes.push({
                  username: username,
                  createdAt: new Date().toISOString()
                });
              }

              _context.next = 13;
              return regeneratorRuntime.awrap(post.save());

            case 13:
              return _context.abrupt("return", post);

            case 16:
              throw new _apolloServer.UserInputError('Post Not Found');

            case 17:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }
};
exports["default"] = _default;
//# sourceMappingURL=likes.js.map