import dotenv from "dotenv";
dotenv.config();

import { ApolloServer } from "apollo-server";
import {
  createComplexityRule,
  simpleEstimator,
} from "graphql-query-complexity";

import { context } from "./context";
import { schema } from "./schema";

const server = new ApolloServer({
  schema,
  context,
  validationRules: [
    createComplexityRule({
      estimators: [
        // Configure your estimators
        simpleEstimator({ defaultComplexity: 1 }),
      ],
      maximumComplexity: 1000,
      // variables: params?.variables ?? {},
      onComplete: (complexity: number) => {
        // console.log("Query Complexity:", complexity);
      },
    }),
  ],
});

server.listen().then(async ({ url }) => {
  console.log(`\
🚀 Server ready at: ${url}
⭐️ See sample queries: http://pris.ly/e/ts/graphql#using-the-graphql-api
  `);
});
