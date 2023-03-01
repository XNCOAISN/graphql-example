import { GraphQLID, GraphQLNonNull, GraphQLString } from "graphql";
import { fromGlobalId, mutationWithClientMutationId } from "graphql-relay";

import { GraphQLPost } from "@/queries/Post";
import * as utils from "@/utils";

export const createPost = mutationWithClientMutationId({
  name: "CreatePost",
  inputFields: {
    slug: {
      type: new GraphQLNonNull(GraphQLString),
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
    },
    authorId: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  outputFields: {
    post: {
      type: GraphQLPost,
    },
  },
  mutateAndGetPayload: async ({ slug, title, content, authorId }) => {
    const { type, id } = fromGlobalId(authorId);
    if (type !== "User") {
      throw new Error("");
    }
    const post = await utils.createPost({
      slug,
      title,
      content,
      authorId: parseInt(id),
    });
    return { post };
  },
});
