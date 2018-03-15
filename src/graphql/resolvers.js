import { gql } from "apollo-boost";

export const defaults = {
  likedPhotos: []
};

export const resolvers = {
  Post: {
    liked: () => false
  },
  Mutation: {
    toggleLikedPost: (_, { id }, { cache, getCacheKey }) => {
      const fragment = gql`
        fragment liked on Post {
          liked
          description
          imageUrl
        }
      `;
      const fragmentId = getCacheKey({ id, __typename: "Post" });
      const post = cache.readFragment({
        fragment,
        id: fragmentId
      });

      // first we have to toggle the client-side only field
      cache.writeData({
        id: fragmentId,
        data: {
          ...post,
          liked: !post.liked
        }
      });

      const query = gql`
        {
          likedPosts @client {
            imageUrl
            description
            id
          }
        }
      `;
      const { likedPosts } = cache.readQuery({ query });

      const data = {
        likedPosts: post.liked
          ? likedPosts.filter(post => post.id !== id)
          : likedPosts.concat([
              { imageUrl: post.imageUrl, id, __typename: "LikedPost" }
            ])
      };

      // add the liked photo to an array for easy access
      cache.writeData({ data });
      return data;
    }
  }
};
