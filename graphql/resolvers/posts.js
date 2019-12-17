import { AuthenticationError } from 'apollo-server';
import { Post } from '../../models';
import { verifyToken } from '../../utils';

export default {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (error) {
        throw new Error(error);
      }
    },
    async getPost(parent, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error('Post Not Found');
        }
      } catch (error) {
        throw new Error(error);
      }
    }
  },
  Mutation: {
    async createPost(parent, { body }, context) {
      const user = verifyToken(context);

      if (body.trim() === '') {
        throw new Error('Post body must not be empty');
      }

      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString()
      });

      const post = await newPost.save();
      context.pubsub.publish('NEW_POST', { newPost: post });
      return post;
    },
    async deletePost(parent, { postId }, context) {
      const user = verifyToken(context);

      try {
        const post = await Post.findById(postId);
        if (user.username === post.username) {
          const a = await post.delete();
          return 'Post Successfully Deleted';
        } else {
          throw new AuthenticationError('Action Not Allowed');
        }
      } catch (error) {
        throw new Error(error);
      }
    }
  },
  Subscription: {
    newPost: {
      subscribe: (parent, args, { pubsub }) => pubsub.asyncIterator('NEW_POST')
    }
  }
};
