"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.object.define-properties");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.keys");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _posts = _interopRequireDefault(require("./posts"));

var _users = _interopRequireDefault(require("./users"));

var _comments = _interopRequireDefault(require("./comments"));

var _likes = _interopRequireDefault(require("./likes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  Post: {
    likeCount: function likeCount(_ref) {
      var likes = _ref.likes;
      return likes.length;
    },
    commentCount: function commentCount(_ref2) {
      var comments = _ref2.comments;
      return comments.length;
    }
  },
  Query: _objectSpread({}, _posts["default"].Query),
  Mutation: _objectSpread({}, _users["default"].Mutation, {}, _posts["default"].Mutation, {}, _comments["default"].Mutation, {}, _likes["default"].Mutation),
  Subscription: _objectSpread({}, _posts["default"].Subscription)
};
exports["default"] = _default;
//# sourceMappingURL=index.js.map