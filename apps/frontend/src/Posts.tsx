import * as React from 'react'
import { initQueryClient } from '@ts-rest/react-query';
import { contract } from 'contract'

const client = initQueryClient(contract, {
  baseUrl: 'http://localhost:8080',
  baseHeaders: {},
});


export function Posts() {

    // const { data, isLoading, error } = client.getPost.useQuery({
    //   params: { id: '1' },
    // });
  
  
    // const postsQuery = client.getPosts.useQuery(
    //   ['posts'], // <- queryKey
    //   { params: { id: '1' } }, // <- Query params, Params, Body etc (all typed)
    // );
  
    const postsQuery = client.posts.getPosts.useQuery(
      ['posts'], // <- queryKey
    );

    if(postsQuery?.isFetching) {
      return <div>LOADING</div>
    }
 
    async function submitPost(e: React.SyntheticEvent) {
      e.preventDefault();
      const target = e.target as typeof e.target & {
        title: { value: string };
        content: { value: string };
      };
      const title = target.title.value;
      const content = target.content.value;
      await client.posts.createPost.mutation({body: {title, content}});
      postsQuery.refetch();
    }
  
    return (
      <div>
        <div>
          <div>Create post</div>
          <form
            onSubmit={submitPost}
          >
            <div>
                <div>
                    <label htmlFor='title'>Title</label>
                </div>
                <input id="title" />
            </div>

            <div>
                <div>
                    <label htmlFor='content'>Content</label>
                </div>
                <textarea id="content" />
            </div>

  
            <button type="submit">Submit</button>
          </form>          
        </div>

        <h2>Existing posts:</h2>
        {postsQuery?.data?.body?.map(post => {
            return (
            <div key={post?.id}>
                <div>Id: {post?.id}</div>
                <div>Title: {post?.title}</div>
                <div>Content: {post?.content}</div>
                <hr />
            </div>
            )
        })}
      </div>
    )
  }
  