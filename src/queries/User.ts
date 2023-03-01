import { connectionDefinitions } from "graphql-relay";
import { Context } from "@/context";
import { GraphQLNode } from "@/interfaces/Node";
import { User } from "@/models";
import { prisma } from "@/prisma";
import DataLoader from "dataloader";
import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import {
  connectionArgs,
  connectionFromArray,
  globalIdField,
} from "graphql-relay";
import { GraphQLPostConnection } from "./Post";
import { nanoid } from "nanoid";

// const sort = <T extends { id: number }>(
//   data: T[],
//   ids: number[]
// ): (T | undefined)[] => {
//   return ids.reduce((prev, current, index) => {
//     const res = data.find((value) => value.id === current);
//     prev[index] = res;
//     return prev;
//   }, Array<T | undefined>(ids.length));
// };

// const postsByUserIdLoader = new DataLoader<number, Post[]>(async (keys) => {
//   const ids = keys as number[];

//   const data = await prisma.post.findMany({
//     where: {
//       UserId: {
//         in: ids,
//       },
//     },
//   });

//   return ids.reduce((prev, current, index) => {
//     prev[index] = data.filter((value) => value.UserId === current);
//     return prev;
//   }, Array<Post[]>(ids.length));
// });

export const GraphQLUser = new GraphQLObjectType<User, Context>({
  name: "User",
  fields: () => ({
    id: globalIdField("User"),
    name: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: async () => {
        return nanoid();
      },
    },
    posts: {
      type: GraphQLPostConnection,
      args: connectionArgs,
      resolve: async ({ id }, args) => {
        const data = await prisma.post.findMany({ where: { authorId: id } });
        // const data = await postsByUserIdLoader.load(id);
        return connectionFromArray(data, args);
      },
    },
  }),
  interfaces: [GraphQLNode],
});

const { connectionType } = connectionDefinitions({
  nodeType: GraphQLUser,
});

export const GraphQLUserConnection = connectionType;
