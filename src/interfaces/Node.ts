import { nodeDefinitions, fromGlobalId } from "graphql-relay";
import { Context } from "@/context";
import { prisma } from "@/prisma";

const get = async (type: string, id: string) => {
  switch (type) {
    case "User":
      return await prisma.user.findUnique({ where: { id: parseInt(id) } });
    case "Post":
      return await prisma.post.findUnique({ where: { id: parseInt(id) } });
    default:
      return null;
  }
};

const { nodeField, nodeInterface } = nodeDefinitions(
  async (globalId) => {
    const { type, id } = fromGlobalId(globalId);

    const data = await get(type, id);
    return {
      // __typename: type,
      ...data,
    };
  },
  (obj) => {
    return obj.__typename;
  }
);

export const GraphQLNode = nodeInterface;
export const NodeField = nodeField;
