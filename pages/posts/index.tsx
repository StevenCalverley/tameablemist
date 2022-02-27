import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { prisma } from '../../lib/prisma';

import type { Post } from '@prisma/client';

export const getStaticProps: GetStaticProps = async () => {
  const posts = await prisma.post.findMany();

  return {
    props: {
      posts: posts.map((post) => ({
        id: post.id,
        title: post.title,
        excerpt: post.excerpt
      }))
    },
    revalidate: 60
  };
};

const PostsPage: NextPage<{ posts: Post[] }> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Tameblemist - Posts</title>
        <meta name="description" content="Tameablemist personal website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto max-w-3xl py-8 space-y-6">
        {posts.map((post) => (
          <div key={post.id}>
            <Link href={`/posts/${post.id}`} passHref>
              <a>
                <h2 className="font-bold text-2xl">{post.title}</h2>
              </a>
            </Link>
            <p className="text-gray-600 text-sm">{post.excerpt}</p>
          </div>
        ))}
        <div className="flex justify-end">
          <Link href={`/posts/add`} passHref>
            <a>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Add
              </button>
            </a>
          </Link>
        </div>
      </main>
    </>
  );
};

export default PostsPage;
