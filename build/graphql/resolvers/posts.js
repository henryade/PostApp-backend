"use strict";

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.sort");

require("core-js/modules/es.date.to-iso-string");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.string.trim");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("regenerator-runtime/runtime");

var _apolloServer = require("apollo-server");

var _models = require("../../models");

var _utils = require("../../utils");

var _default = {
  Query: {
    getPosts: function getPosts() {
      var posts;
      return regeneratorRuntime.async(function getPosts$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return regeneratorRuntime.awrap(_models.Post.find().sort({
                createdAt: -1
              }));

            case 3:
              posts = _context.sent;
              return _context.abrupt("return", posts);

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              throw new Error(_context.t0);

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 7]]);
    },
    getPost: function getPost(parent, _ref) {
      var postId, post;
      return regeneratorRuntime.async(function getPost$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              postId = _ref.postId;
              _context2.prev = 1;
              _context2.next = 4;
              return regeneratorRuntime.awrap(_models.Post.findById(postId));

            case 4:
              post = _context2.sent;

              if (!post) {
                _context2.next = 9;
                break;
              }

              return _context2.abrupt("return", post);

            case 9:
              throw new Error('Post Not Found');

            case 10:
              _context2.next = 15;
              break;

            case 12:
              _context2.prev = 12;
              _context2.t0 = _context2["catch"](1);
              throw new Error(_context2.t0);

            case 15:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[1, 12]]);
    }
  },
  Mutation: {
    createPost: function createPost(parent, _ref2, context) {
      var body, user, newPost, post;
      return regeneratorRuntime.async(function createPost$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              body = _ref2.body;
              user = (0, _utils.verifyToken)(context);

              if (!(body.trim() === '')) {
                _context3.next = 4;
                break;
              }

              throw new Error('Post body must not be empty');

            case 4:
              newPost = new _models.Post({
                body: body,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString()
              });
              _context3.next = 7;
              return regeneratorRuntime.awrap(newPost.save());

            case 7:
              post = _context3.sent;
              context.pubsub.publish('NEW_POST', {
                newPost: post
              });
              return _context3.abrupt("return", post);

            case 10:
            case "end":
              return _context3.stop();
          }
        }
      });
    },
    deletePost: function deletePost(parent, _ref3, context) {
      var postId, user, post, a;
      return regeneratorRuntime.async(function deletePost$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              postId = _ref3.postId;
              user = (0, _utils.verifyToken)(context);
              _context4.prev = 2;
              _context4.next = 5;
              return regeneratorRuntime.awrap(_models.Post.findById(postId));

            case 5:
              post = _context4.sent;

              if (!(user.username === post.username)) {
                _context4.next = 13;
                break;
              }

              _context4.next = 9;
              return regeneratorRuntime.awrap(post["delete"]());

            case 9:
              a = _context4.sent;
              return _context4.abrupt("return", 'Post Successfully Deleted');

            case 13:
              throw new _apolloServer.AuthenticationError('Action Not Allowed');

            case 14:
              _context4.next = 19;
              break;

            case 16:
              _context4.prev = 16;
              _context4.t0 = _context4["catch"](2);
              throw new Error(_context4.t0);

            case 19:
            case "end":
              return _context4.stop();
          }
        }
      }, null, null, [[2, 16]]);
    }
  },
  Subscription: {
    newPost: {
      subscribe: function subscribe(parent, args, _ref4) {
        var pubsub = _ref4.pubsub;
        return pubsub.asyncIterator('NEW_POST');
      }
    }
  }
};
exports["default"] = _default;
//# sourceMappingURL=posts.js.map