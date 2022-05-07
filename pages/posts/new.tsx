import { trpc } from '@/lib/trpc';
import type { NextPageWithAuthAndLayout } from '@/lib/types';
import Head from 'next/head';
import { useRouter } from 'next/router';

const NewPostPage: NextPageWithAuthAndLayout = () => {
  const router = useRouter();
  const addPostMutation = trpc.useMutation('post.add', {
    onError: (error) => {
      console.error(`Something went wrong: ${error.message}`);
    }
  });

  return (
    <>
      <Head>
        <title>New Post - Tameablemist</title>
      </Head>

      <main className="container mx-auto max-w-3xl py-8">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          New post
        </h1>
        {/* <PostForm
          isSubmitting={addPostMutation.isLoading}
          defaultValues={{
            title: '',
            content: ''
          }}
          backTo="/post"
          onSubmit={(values) => {
            addPostMutation.mutate(
              { title: values.title, content: values.content },
              {
                onSuccess: (data) => router.push(`/post/${data.id}`)
              }
            );
          }}
        /> */}
      </main>
    </>
  );
};

NewPostPage.auth = true;

export default NewPostPage;
