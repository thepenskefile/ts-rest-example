import { Controller } from '@nestjs/common';
import { PostService } from './post.service';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contract } from 'contract';

@Controller()
export class PostsController {
  constructor(private readonly postService: PostService) {}

  @TsRestHandler(contract.posts)
  async handler() {
    return tsRestHandler(contract.posts, {
      getPost: async ({ params }) => {
        const post = await this.postService.post({ id: Number(params.id) });

        if (!post) {
          return { status: 404, body: null };
        }

        return { status: 200, body: post };
      },
      getPosts: async () => {
        const posts = await this.postService.posts({});

        return { status: 200, body: posts };
      },
      createPost: async ({ body }) => {
        const posts = await this.postService.createPost(body);

        return { status: 200, body: posts };
      },
    });
  }

  // @Get()
  // findAll(): string {
  //   return 'This action returns all posts';
  // }

  // @Get(':id')
  // async getPostById(@Param('id') id: string): Promise<PostModel | null> {
  //   return this.postService.post({ id: Number(id) });
  // }

  // @Post()
  // async create(
  //   @Body() postData: { title: string; content?: string; authorEmail: string },
  // ): Promise<PostModel> {
  //   const { title, content } = postData;
  //   return this.postService.createPost({
  //     title,
  //     content,
  //   });
  // }
}
