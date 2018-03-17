import React from "react";
import { Link } from "react-router-dom";
import { graphql } from "react-apollo";
import Post from "./Post";
import FEED_QUERY from "./graphql/feed.graphql";
import FEED_SUBSCRIPTION from "./graphql/feedSubscription.graphql";

class ListPage extends React.Component {
  componentDidMount() {
    this.subscribeToNewFeed();
  }

  subscribeToNewFeed() {
    this.props.feedQuery.subscribeToMore({
      document: FEED_SUBSCRIPTION,
      updateQuery: (previous, { subscriptionData }) => {
        if (subscriptionData.data.newPost.mutation === "DELETED") return;
        const newAllPosts = [
          subscriptionData.data.newPost.node,
          ...previous.feed
        ];
        const result = {
          ...previous,
          feed: [...newAllPosts]
        };
        return result;
      }
    });
  }

  render() {
    const { feed, loading, error } = this.props.feedQuery;
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{JSON.stringify(error)}</div>;

    return (
      <div role="main" className="w-100 flex justify-center">
        <Link
          to="/new"
          className="fixed bg-white top-0 right-0 pa4 ttu dim black no-underline"
        >
          + New Post
        </Link>
        {feed.length > 0 && (
          <div className="w-100" style={{ maxWidth: 400 }}>
            {feed.map(post => (
              <Post
                key={post.id}
                {...post}
                refresh={() => this.props.feedQuery.refetch()}
              />
            ))}
          </div>
        )}
        {feed.length === 0 && <div>No posts yet!</div>}
      </div>
    );
  }
}

export default graphql(FEED_QUERY, {
  name: "feedQuery"
})(ListPage);
