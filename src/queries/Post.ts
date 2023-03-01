import { connectionDefinitions, fromGlobalId } from "graphql-relay";
import { Context } from "@/context";
import { GraphQLNode } from "@/interfaces/Node";
import { Post } from "@/models";
import { prisma } from "@/prisma";
import DataLoader from "dataloader";
import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { globalIdField } from "graphql-relay";
import { GraphQLUser } from "./User";

export const GraphQLPost = new GraphQLObjectType<Post, Context>({
  name: "Post",
  fields: () => ({
    id: globalIdField("Post"),
    slug: {
      type: new GraphQLNonNull(GraphQLString),
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
    },
    author: {
      type: new GraphQLNonNull(GraphQLUser),
      resolve: async ({ authorId }) => {
        const data = await prisma.user.findUnique({ where: { id: authorId } });
      },
    },
  }),
  interfaces: [GraphQLNode],
});

const { connectionType } = connectionDefinitions({
  nodeType: GraphQLPost,
});

export const GraphQLPostConnection = connectionType;
