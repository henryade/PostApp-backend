import PostResolvers from './posts';
import UserResolvers from './users';
import CommentResolvers from './comments';
import LikeResolvers from './likes';

export default {
  Post: {
    likeCount:({ likes }) => likes.length,
    commentCount:({ comments }) => comments.length
  },
  Query: {
    ...PostResolvers.Query,
  },
  Mutation: {
    ...UserResolvers.Mutation,
    ...PostResolvers.Mutation,
    ...CommentResolvers.Mutation,
    ...LikeResolvers.Mutation
  },
  Subscription: {
    ...PostResolvers.Subscription
  }
};
