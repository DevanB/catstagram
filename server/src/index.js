const { GraphQLServer } = require("graphql-yoga");
const { Prisma } = require("prisma-binding");

const resolvers = {
  Query: {
    feed(parent, args, ctx, info) {
      return ctx.db.query.posts({}, info);
    },
    post(parent, { id }, ctx, info) {
      return ctx.db.query.post({ where: { id } }, info);
    }
  },
  Mutation: {
    createPost(parent, { imageUrl, description }, ctx, info) {
      return ctx.db.mutation.createPost(
        {
          data: {
            imageUrl,
            description
          }
        },
        info
      );
    },
    deletePost(parent, { id }, ctx, info) {
      return ctx.db.mutation.deletePost({ where: { id } }, info);
    }
  },
  Subscription: {
    feedSubscription: {
      subscribe: (parent, args, ctx, info) => {
        return ctx.db.subscription.post({}, info);
      }
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: "src/generated/prisma.graphql",
      endpoint: "http://localhost:4466/server/dev", // the endpoint of the Prisma DB service
      secret: "mysecret123", // specified in database/prisma.yml
      debug: true // log all GraphQL queryies & mutations
    })
  })
});

server.start(() => console.log("Server is running on http://localhost:3000"));
