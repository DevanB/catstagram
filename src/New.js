import React from "react";
import { withRouter } from "react-router-dom";
import { graphql } from "react-apollo";
import ALL_POSTS_QUERY from "./graphql/feed.graphql";
import CREATE_POST_MUTATION from "./graphql/createPost.graphql";

class New extends React.Component {
  state = {
    description: "",
    imageUrl: ""
  };

  render() {
    const { imageUrl, description } = this.state;

    return (
      <div role="main" className="w-100 pa4 flex justify-center">
        <form onSubmit={this.handlePost} style={{ maxWidth: 400 }}>
          <input
            className="w-100 pa3 mv2"
            name="description"
            onChange={this.handleInputChange}
            value={description}
            placeholder="Description"
          />
          <input
            className="w-100 pa3 mv2"
            name="imageUrl"
            onChange={this.handleInputChange}
            value={imageUrl}
            placeholder="Image Url"
          />
          <input
            type="submit"
            disabled={!description || !imageUrl}
            className="pa3 bg-black-10 bn dim ttu pointer"
            value="Post"
          />
        </form>
      </div>
    );
  }

  handleInputChange = event => {
    const target = event.target;
    this.setState({
      [target.name]: target.value
    });
  };

  handlePost = event => {
    event.preventDefault();
    const { description, imageUrl } = this.state;
    this.props
      .createPost({
        variables: { description, imageUrl },
        update: (store, { data: { createPost } }) => {
          const data = store.readQuery({ query: ALL_POSTS_QUERY });
          data.feed = [...data.feed, createPost];
          store.writeQuery({
            query: ALL_POSTS_QUERY,
            data
          });
        }
      })
      .then(() => this.props.history.push("/"));
  };
}

export default withRouter(
  graphql(CREATE_POST_MUTATION, { name: "createPost" })(New)
);
