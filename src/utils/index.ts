import { prisma } from "@/prisma";

export type CreateUserArgs = {
  authId: string;
  slug: string;
  name: string;
};

export const createUser = async ({ authId, slug, name }: CreateUserArgs) => {
  const User = await prisma.user.create({
    data: {
      authId,
      slug,
      name,
    },
  });
  return User;
};

export type UpdateUserArgs = {
  id: number;
  slug: string;
  name: string;
};

export const updateUser = async ({ id, slug, name }: UpdateUserArgs) => {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      slug,
      name,
    },
  });
  return user;
};

export type CreatePostArgs = {
  slug: string;
  title: string;
  content: string;
  authorId: number;
};

export const createPost = async ({
  slug,
  title,
  content,
  authorId,
}: CreatePostArgs) => {
  const post = await prisma.post.create({
    data: {
      slug,
      title,
      content,
      author: {
        connect: {
          id: authorId,
        },
      },
    },
  });
  return post;
};
