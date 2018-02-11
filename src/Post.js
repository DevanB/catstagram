import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Post extends React.Component {
  render() {
    const { imageUrl, description } = this.props;
    return (
      <div className="pa3 bg-black-05 ma3">
        <div
          className="w-100"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            paddingBottom: '100%'
          }}
        />
        <div className="pt3">
          {description}{' '}
          <span className="red f6 pointer dim" onClick={this.handleDelete}>
            Delete
          </span>
        </div>
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

const ALL_POSTS_QUERY = gql`
  query AllPosts {
    feed {
      id
      imageUrl
      description
    }
  }
`;

const DELETE_MUTATION = gql`
  mutation DeletePostMutation($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`;

export default graphql(DELETE_MUTATION, { name: 'deletePost' })(Post);
