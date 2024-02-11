import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { createExpressEndpoints, initServer } from "@ts-rest/express";
import { contract } from "contract";
import { PrismaClient } from "@prisma/client";

dotenv.config();
const prisma = new PrismaClient();

const app: Express = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const s = initServer();

const router = s.router(contract, {
  posts: {
    createPost: async ({ body }) => {
      const post = await prisma.post.create({
        data: {
          title: body.title,
          content: body?.content,
        },
      });

      return {
        status: 201,
        body: post,
      };
    },

    getPosts: async () => {
      const posts = await prisma.post.findMany();

      // if(!post) {
      //   return {
      //     status: 404,
      //     body: "Not found"
      //   }
      // }

      return {
        status: 200,
        body: posts,
      };
    },

    getPost: async ({ params: { id } }) => {
      const post = await prisma.post.findUnique({
        where: { id: parseInt(id) },
      });

      // if(!post) {
      //   return {
      //     status: 404,
      //     body: "Not found"
      //   }
      // }

      return {
        status: 200,
        body: post,
      };
    },
  },
});

createExpressEndpoints(contract, router, app);

const port = process.env.port || 8080;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
