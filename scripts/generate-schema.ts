import fs from "fs";
import path from "path";
import { printSchema } from "graphql";
import { schema } from "../src/schema";

const dir = path.join(__dirname, "../dist");

fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, "schema.graphql"), printSchema(schema));
