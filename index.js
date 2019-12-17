import '@babel/register';
import { ApolloServer, PubSub } from 'apollo-server';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

config();

const { ConnectionString, PORT } = process.env;
const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub })
});

mongoose
  .connect(ConnectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database Connected');
    return server.listen({ port: PORT });
  })
  .then(({ url }) => console.log(`Server Started at ${url}`))
  .catch(err => {
    console.error(err);
  });
