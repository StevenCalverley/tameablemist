import { useState, FormEventHandler } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const AddPostPage: NextPage = () => {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');

  const resetForm = () => {
    setTitle('');
    setExcerpt('');
    setContent('');
  };

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    if (title.length > 0 && excerpt.length > 0 && content.length > 0) {
      const res = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
          title,
          excerpt,
          content
        })
      });

      const post = await res.json();

      console.log(post);
      resetForm();
    }
  };

  return (
    <>
      <Head>
        <title>Tameblemist - Posts</title>
        <meta name="description" content="Tameablemist personal website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto max-w-3xl py-8">
        <h1 className="font-bold text-lg">Add Post</h1>
        <form className="relative" onSubmit={handleSubmit}>
          <div className="border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
            <label htmlFor="title" className="sr-only">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="block w-full border-0 pt-2.5 text-lg font-medium placeholder-gray-500 focus:ring-0"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="excerpt" className="sr-only">
              Excerpt
            </label>
            <textarea
              rows={2}
              name="excerpt"
              id="excerpt"
              className="block w-full border-0 py-0 resize-none placeholder-gray-500 focus:ring-0 sm:text-sm"
              placeholder="Write a excerpt..."
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
            />
            <label htmlFor="content" className="sr-only">
              Content
            </label>
            <textarea
              rows={4}
              name="content"
              id="content"
              className="block w-full border-0 py-0 resize-none placeholder-gray-500 focus:ring-0 sm:text-sm"
              placeholder="Write content..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            {/* Spacer element to match the height of the toolbar */}
            <div aria-hidden="true">
              <div className="h-px" />
              <div className="py-2">
                <div className="py-px">
                  <div className="h-9" />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 w-full">
            <div className="border-t border-gray-200 px-2 py-2 flex justify-between items-center space-x-3 sm:px-3">
              <div className="flex"></div>
              <div className="flex-shrink-0 space-x-2">
                <Link href={'/posts'} passHref>
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black  hover:border-gray-300 focus:outline-none">
                    Cancel
                  </button>
                </Link>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </>
  );
};

export default AddPostPage;
