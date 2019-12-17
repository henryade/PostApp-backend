import { UserInputError, AuthenticationError } from 'apollo-server';
import { Post } from '../../models';
import { verifyToken, validateCommentInput } from '../../utils';

export default {
  Mutation: {
    createComment: async (parent, { postId, body }, context) => {
      const { username } = verifyToken(context);
      const { errors, valid } = validateCommentInput(body);
      if (!valid) {
        throw new UserInputError('Empty Comment', { errors });
      }

      const post = await Post.findById(postId);
      if (post) {
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString()
        });
        await post.save();
        return post;
      } else throw new UserInputError('Post Not Found');
    },
    deleteComment: async (parent, { postId, commentId }, context) => {
      const { username } = verifyToken(context);

      const post = await Post.findById(postId);
      if (post) {
        const commentIndex = post.comments.findIndex(({ id }) => id === commentId);
        if (post.comments[commentIndex] ){
          if(post.comments[commentIndex].username === username) {
            post.comments.splice(commentIndex, 1);
            await post.save();
            return post;
          } else throw new AuthenticationError('Action Not Allowed');
        } else throw new UserInputError('Comment Not Found');
      } else throw new UserInputError('Post Not Found');
    }
  }
};
