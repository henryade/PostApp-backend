"use strict";

require("core-js/stable");

require("regenerator-runtime/runtime");

var _apolloServer = require("apollo-server");

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = require("dotenv");

var _typeDefs = _interopRequireDefault(require("./graphql/typeDefs"));

var _resolvers = _interopRequireDefault(require("./graphql/resolvers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _dotenv.config)();
var _process$env = process.env,
    ConnectionString = _process$env.ConnectionString,
    PORT = _process$env.PORT;
var pubsub = new _apolloServer.PubSub();
var server = new _apolloServer.ApolloServer({
  typeDefs: _typeDefs["default"],
  resolvers: _resolvers["default"],
  context: function context(_ref) {
    var req = _ref.req;
    return {
      req: req,
      pubsub: pubsub
    };
  }
});

_mongoose["default"].connect(ConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  console.log('Database Connected');
  return server.listen({
    port: PORT
  });
}).then(function (_ref2) {
  var url = _ref2.url;
  return console.log("Server Started at ".concat(url));
})["catch"](function (err) {
  console.error(err);
});
//# sourceMappingURL=index.js.map