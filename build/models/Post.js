"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var postSchema = new _mongoose.Schema({
  username: String,
  body: String,
  createdAt: String,
  comments: [{
    body: String,
    username: String,
    createdAt: String
  }],
  likes: [{
    username: String,
    createdAt: String
  }],
  user: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'users'
  }
});

var _default = (0, _mongoose.model)('Post', postSchema);

exports["default"] = _default;
//# sourceMappingURL=Post.js.map