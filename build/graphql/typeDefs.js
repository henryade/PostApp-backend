"use strict";

require("core-js/modules/es.array.slice");

require("core-js/modules/es.object.define-properties");

require("core-js/modules/es.object.freeze");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _apolloServer = require("apollo-server");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  type Post {\n    id: ID!\n    body: String!\n    createdAt: String!\n    username: String!\n    comments: [Comment]!\n    likes: [Like]!\n    likeCount: Int!\n    commentCount: Int!\n  }\n  type Comment {\n    id: ID!\n    body: String!\n    createdAt: String!\n    username: String!\n  }\n  type Like {\n    id: ID!\n    createdAt: String!\n    username: String!\n  }\n  type User {\n    id: ID!\n    email: String!\n    username: String!\n    token: String!\n    createdAt: String!\n  }\n  input RegisterInput {\n    username: String!\n    password: String!\n    confirmPassword: String!\n    email: String!\n  }\n  input LoginInput {\n    username: String!\n    password: String!\n  }\n  type Query {\n    getPosts: [Post]\n    getPost(postId: ID!): Post\n  }\n  type Mutation {\n    register(registerInput: RegisterInput): User!\n    login(loginInput: LoginInput): User!\n    createPost(body: String!): Post!\n    deletePost(postId: ID!): String!\n    createComment(postId: ID!, body: String!): Post!\n    deleteComment(postId: ID!, commentId: ID!): Post!\n    likePost(postId: ID!): Post!\n  }\n  type Subscription {\n    newPost: Post!\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

// comments :[Comment!]! means there musut be at least one comment inside the array and it must return an array
var _default = (0, _apolloServer.gql)(_templateObject());

exports["default"] = _default;
//# sourceMappingURL=typeDefs.js.map