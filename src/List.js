import React from "react";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import FEED_QUERY from "./graphql/feed.graphql";

const ListPage = () => (
  <Query query={FEED_QUERY}>
    {({ data, error, loading }) => {
      if (loading) return <div>Loading...</div>;
      if (error) return <div>{JSON.stringify(error)}</div>;

      return (
        <div role="main" className="w-100 flex justify-center">
          {data.feed.length > 0 && (
            <div className="w-100" style={{ maxWidth: 400 }}>
              {data.feed.map(post => (
                <React.Fragment>
                  <img src={`${post.imageUrl}`} />
                  <p>{post.description}</p>
                </React.Fragment>
              ))}
            </div>
          )}
          {data.feed.length === 0 && <div>No posts yet!</div>}
        </div>
      );
    }}
  </Query>
);

export default ListPage;
