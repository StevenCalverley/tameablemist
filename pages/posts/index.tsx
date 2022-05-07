import * as React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import { InferQueryPathAndInput, trpc } from '@/lib/trpc';
import type { NextPageWithAuthAndLayout } from '@/lib/types';

import { PostSummarySkeleton } from '@/components/posts/post-summary-skeleton';
import { PostSummaryProps } from '@/components/posts/post-summary';

const PostSummary = dynamic<PostSummaryProps>(
  () =>
    import('@/components/posts/post-summary').then((mod) => mod.PostSummary),
  { ssr: false }
);

const POSTS_PER_PAGE = 20;

const Posts: NextPageWithAuthAndLayout = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const currentPageNumber = router.query.page ? Number(router.query.page) : 1;
  const utils = trpc.useContext();
  const feedQueryPathAndInput: InferQueryPathAndInput<'post.feed'> = [
    'post.feed'
  ];
  const feedQuery = trpc.useQuery(feedQueryPathAndInput);

  if (feedQuery.data) {
    return (
      <>
        <Head>
          <title>Posts - Tameablemist</title>
        </Head>

        <main className="container mx-auto max-w-3xl py-8">
          {feedQuery.data.postCount === 0 ? (
            <div className="text-center text-secondary border rounded py-20 px-10">
              There are no published posts to show yet.
            </div>
          ) : (
            <div className="flow-root">
              <ul className="-my-12 divide-y divide-primary">
                {feedQuery.data.posts.map((post) => (
                  <li key={post.id} className="py-10">
                    <PostSummary
                      post={post}
                      onLike={() => {
                        // likeMutation.mutate(post.id);
                      }}
                      onUnlike={() => {
                        // unlikeMutation.mutate(post.id);
                      }}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </main>
      </>
    );
  }

  if (feedQuery.isError) {
    return <div>Error: {feedQuery.error.message}</div>;
  }

  return (
    <main className="container mx-auto max-w-3xl py-8">
      <div className="flow-root">
        <ul className="-my-12 divide-y divide-primary">
          {[...Array(3)].map((_, idx) => (
            <li key={idx} className="py-10">
              <PostSummarySkeleton />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

Posts.auth = true;

export default Posts;
