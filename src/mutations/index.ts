import { updateUser } from "./updateUser";
import { createPost } from "./createPost";
import { GraphQLObjectType } from "graphql";

export const GraphQLMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    updateUser,
    createPost,
  },
});
