import React from "react";
import { graphql, Mutation } from "react-apollo";
import ALL_POSTS_QUERY from "./graphql/feed.graphql";
import DELETE_MUTATION from "./graphql/deletePost.graphql";
import TOGGLE_LIKED_POST from "./graphql/toggleLikedPost.graphql";

class Post extends React.Component {
  render() {
    const { imageUrl, id, description, liked } = this.props;
    console.log(id);
    return (
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
          <span className="red f6 pointer dim" onClick={this.handleDelete}>
            Delete
          </span>
        </div>
        <Mutation mutation={TOGGLE_LIKED_POST} variables={{ id: id }}>
          {toggleLike => (
            <span>
              <button onClick={toggleLike}>Like</button>
            </span>
          )}
        </Mutation>
        {liked ? "Liked!" : "Not Liked :("}
      </div>
    );
  }

  handleDelete = () => {
    this.props.deletePost({
      variables: { id: this.props.id },
      update: (store, { data: { deletePost } }) => {
        const data = store.readQuery({ query: ALL_POSTS_QUERY });
        const newPosts = data.feed.filter(post => post.id !== deletePost.id);
        store.writeQuery({
          query: ALL_POSTS_QUERY,
          data: {
            ...data,
            feed: newPosts
          }
        });
      }
    });
  };
}

export default graphql(DELETE_MUTATION, { name: "deletePost" })(Post);
