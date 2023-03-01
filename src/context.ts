import { User } from "@prisma/client";
import { ContextFunction } from "apollo-server-core";
import { ExpressContext } from "apollo-server-express";
import { verify } from "jsonwebtoken";
import { nanoid } from "nanoid";
import { Request } from "express";
import { prisma } from "./prisma";

export interface Context {
  me?: User;
}

export const context: ContextFunction<ExpressContext> = async ({ req }) => {
  const me = await getMe(req);
  return { me };
};

const getMe = async (req: Request) => {
  const token = req.headers?.authorization?.split(" ")[1] ?? "";

  try {
    const data = verify(token, process.env.JWT_SECRET as string);

    const authId = data.sub as string;
    if (authId) {
      const user = await prisma.user.findUnique({ where: { authId } });

      if (user) {
        return user;
      }

      return await prisma.user.create({
        data: {
          authId,
          slug: "",
          name: "Name",
        },
      });
    }

    return null;
  } catch (e) {
    console.error(e);
    throw new Error("Your session expired. Sign in again.");
  }
};
