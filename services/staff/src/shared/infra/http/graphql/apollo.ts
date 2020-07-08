import { ApolloServer } from "apollo-server-express";
import { schema } from "../../../../modules/infra/http/graphql/schema";

const server = new ApolloServer({
  introspection: true,
  playground: { settings: { "request.credentials": "include" } },
  schema,
  uploads: false,
  formatError: (error) => {
    const message = error.message
      .replace("SequelizeValidationError: ", "")
      .replace("Validation error: ", "");
    return {
      ...error,
      message,
    };
  },
  context: ({ req }) => {
    if (req) {
      return {
        req,
      };
    }
  },
});

export function GraphQLServer(app) {
  server.applyMiddleware({ app, path: "/graphql/v1" });
}
