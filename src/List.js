import React from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Post from './Post';

const ListPage = () => (
  <Query
    query={gql`
      query feed {
        feed {
          id
          imageUrl
          description
        }
      }
    `}
  >
    {({ data, error, loading }) => {
      if (loading) return <div>Loading</div>;
      if (error) return <div>{JSON.stringify(error)}</div>;

      return (
        <div role="main" className="w-100 flex justify-center">
          <Link to="/new" className="fixed bg-white top-0 right-0 pa4 ttu dim black no-underline">
            + New Post
          </Link>
          {data.feed.length > 0 && (
            <div className="w-100" style={{ maxWidth: 400 }}>
              {data.feed.map(post => <Post key={post.id} {...post} refresh={() => data.refetch()} />)}
            </div>
          )}
          {data.feed.length === 0 && <div>No posts yet!</div>}
        </div>
      );
    }}
  </Query>
);

export default ListPage;
