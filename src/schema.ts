import { GraphQLSchema } from "graphql";
import { GraphQLQuery } from "./queries";
import { GraphQLMutation } from "./mutations";

export const schema = new GraphQLSchema({
  query: GraphQLQuery,
  mutation: GraphQLMutation,
});
