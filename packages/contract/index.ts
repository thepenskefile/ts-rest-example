import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

const PostSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string().nullable()
});

const postContract = c.router({
  createPost: {
    method: 'POST',
    path: '/posts',
    responses: {
      201: PostSchema,
    },
    body: z.object({
      title: z.string(),
      content: z.string().nullable()
    }),
    summary: 'Create a post',
  },
  getPosts: {
    method: 'GET',
    path: `/posts`,
    responses: {
      200: z.array(PostSchema.nullable()),
    },
    summary: 'Get a post by id',
  },
  getPost: {
    method: 'GET',
    path: `/posts/:id`,
    responses: {
      200: PostSchema.nullable(),
    },
    summary: 'Get a post by id',
  }
})

export const contract = c.router({
  posts: postContract
});