import { useEffect, useState } from 'react';
import type { GetStaticProps, GetStaticPropsContext, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import type { Post } from '@prisma/client';

export async function getStaticPaths() {
  const URL = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';

  const res = await fetch(`${URL}/api/posts`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'User-Agent': '*'
    }
  });

  const posts: Post[] = await res.json();
  const paths = posts.map((post) => {
    return {
      params: {
        id: post.id.toString()
      }
    };
  });

  return {
    paths,
    fallback: false // false or 'blocking'
  };
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext<{ id?: string }>
) => {
  const URL = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';
  if (context?.params?.id) {
    const { id } = context.params;
    const res = await fetch(`${URL}/api/posts/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'User-Agent': '*'
      }
    });
    if (!res.ok) {
      return {
        notFound: true
      };
    }

    const post = await res.json();

    return {
      props: {
        post
      }
    };
  }

  return {
    notFound: true
  };
};

const SinglePost: NextPage<{ post: Post }> = ({ post }) => {
  const { id, title, excerpt, createdAt, content } = post;
  const [views, setViews] = useState(post.views);
  const [likes, setLikes] = useState(post.likes);
  const formattedDate = new Date(createdAt).toLocaleDateString();

  useEffect(() => {
    fetch(`/api/posts/${id}/views`, { method: 'POST' })
      .then((res) => res.json())
      .then((data) => setViews(data.views));
  }, [id]);

  const handleLike = () => {
    fetch(`/api/posts/${id}/likes`, { method: 'POST' })
      .then((res) => res.json())
      .then((data) => setLikes(data.likes));
  };

  return (
    <>
      <Head>
        <title>Tameblemist - Post</title>
        <meta name="description" content="Tameablemist personal website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto max-w-3xl py-8">
        <h1 className="font-bold text-3xl">{title}</h1>
        <p className="text-gray-400 text-sm">
          {formattedDate}{' '}
          <span className="px-1.5 py-1 bg-gray-100 text-gray-700 rounded-full font-medium">
            {views}
          </span>
        </p>
        <p className="mt-2 text-gray-700">{excerpt}</p>
        <p className="mt-2 text-gray-700 whitespace-pre-line">{content}</p>
        <p>Likes: {likes}</p>
        <Link href="/posts">
          <a className="mt-2 block text-blue-800">Back to posts</a>
        </Link>
        <button
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={handleLike}
        >
          Like
        </button>
      </main>
    </>
  );
};

export default SinglePost;
