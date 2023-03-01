import { GraphQLObjectType, GraphQLString } from "graphql";
import { connectionArgs, connectionFromArray } from "graphql-relay";

import { Context } from "@/context";
import { prisma } from "@/prisma";
import { NodeField } from "@/interfaces/Node";
import { GraphQLPostConnection } from "./Post";
import { GraphQLUser, GraphQLUserConnection } from "./User";
import { Fzf } from "fzf";

export const GraphQLQuery = new GraphQLObjectType<void, Context>({
  name: "Query",
  fields: () => ({
    node: NodeField,
    me: {
      type: GraphQLUser,
      resolve: async (_, __, ctx) => {
        return ctx.me;
      },
    },
    users: {
      type: GraphQLUserConnection,
      args: connectionArgs,
      resolve: async (_, args) => {
        const data = await prisma.user.findMany();
        return connectionFromArray(data, args);
      },
    },
    posts: {
      type: GraphQLPostConnection,
      args: {
        ...connectionArgs,
        q: {
          type: GraphQLString,
        },
      },
      resolve: async (_, args) => {
        const data = await prisma.post.findMany();
        console.log({ args });

        // const fzf = new Fzf(data.map((value) => value.title));

        return connectionFromArray(
          data.filter((value) => value.title.includes(args.q)),
          args
        );
        // return connectionFromArray(data, args);
      },
    },
  }),
});
