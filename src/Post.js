import React from "react";
import { graphql, Mutation } from "react-apollo";
import ALL_POSTS_QUERY from "./graphql/feed.graphql";
import DELETE_MUTATION from "./graphql/deletePost.graphql";
import TOGGLE_LIKED_POST from "./graphql/toggleLikedPost.graphql";

const handleUpdate = (store, { data: { deletePost } }) => {
  const data = store.readQuery({ query: ALL_POSTS_QUERY });
  const newPosts = data.feed.filter(post => post.id !== deletePost.id);
  store.writeQuery({
    query: ALL_POSTS_QUERY,
    data: {
      ...data,
      feed: newPosts
    }
  });
};

const Post = ({ description, id, imageUrl, liked }) => (
  <div className="pa3 bg-black-05 ma3">
    <div
      className="w-100"
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        paddingBottom: "100%"
      }}
    />
    <Mutation
      mutation={DELETE_MUTATION}
      variables={{ id: id }}
      update={handleUpdate}
    >
      {handleDelete => (
        <span className="red f6 pointer dim" onClick={handleDelete}>
          Delete
        </span>
      )}
    </Mutation>
    {liked ? (
      "Liked!"
    ) : (
      <Mutation mutation={TOGGLE_LIKED_POST} variables={{ id: id }}>
        {toggleLike => (
          <span>
            <button onClick={toggleLike}>Like</button>
          </span>
        )}
      </Mutation>
    )}
  </div>
);
export default Post;
