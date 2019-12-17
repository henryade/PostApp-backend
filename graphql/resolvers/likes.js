import { UserInputError } from 'apollo-server';
import { Post } from '../../models';
import { verifyToken } from '../../utils';

export default {
  Mutation: {
    likePost: async(parent, { postId }, context) => {
      const { username } = await verifyToken(context);

      const post = await Post.findById(postId);
      if (post) {
        const like = post.likes.find(like => like.username === username);
        if (like){
          post.likes = post.likes.filter(like => like.username !== username)
        } else {
          post.likes.push({
            username,
            createdAt: new Date().toISOString()
          });
        }
        await post.save();
        return post;
      } else throw new UserInputError('Post Not Found');
    }
  }
}