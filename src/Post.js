import React from "react";
import { Mutation } from "react-apollo";
import ALL_POSTS_QUERY from "./graphql/feed.graphql";
import DELETE_MUTATION from "./graphql/deletePost.graphql";

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

const Post = ({ description, id, imageUrl }) => (
  <div className="pa3 bg-black-05 ma3">
    <div
      className="w-100"
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        paddingBottom: "100%"
      }}
    />
    <div className="pt3">
      {description}{" "}
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
    </div>
  </div>
);

export default Post;
