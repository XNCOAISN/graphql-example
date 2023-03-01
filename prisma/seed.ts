import { prisma } from "@/prisma";
import { createUser, createPost } from "@/utils";
import { faker } from "@faker-js/faker";

const main = async () => {
  [...Array(10)].map(() => {
    createUser({
      authId: faker.random.alphaNumeric(20),
      slug: faker.lorem.slug(),
      name: faker.name.fullName(),
    }).then((user) => {
      [...Array(10)].map(() => {
        createPost({
          slug: faker.lorem.slug(),
          title: faker.lorem.sentence(5),
          content: faker.lorem.lines(),
          authorId: user.id,
        });
      });
    });
  });
};

main()
  .then(() => console.log("finish"))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
