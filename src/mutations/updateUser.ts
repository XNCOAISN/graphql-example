import { GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
import { GraphQLUser } from "@/queries/User";
import * as utils from "@/utils";
import { Context } from "@/context";

export const updateUser = mutationWithClientMutationId({
  name: "UpdateUser",
  inputFields: {
    slug: {
      type: new GraphQLNonNull(GraphQLString),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  outputFields: {
    user: {
      type: GraphQLUser,
    },
  },
  mutateAndGetPayload: async ({ slug, name }, ctx: Context) => {
    console.log({ slug, name });
    if (!ctx.me) {
      throw new Error("");
    }
    const id = ctx.me.id;
    const user = await utils.updateUser({ id, slug, name });
    return { user };
  },
});
