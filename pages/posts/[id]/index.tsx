import * as React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useSession } from 'next-auth/react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { InferQueryOutput, InferQueryPathAndInput, trpc } from '@/lib/trpc';
import type { NextPageWithAuthAndLayout } from '@/lib/types';

function getPostQueryPathAndInput(
  id: number
): InferQueryPathAndInput<'post.detail'> {
  return [
    'post.detail',
    {
      id
    }
  ];
}

const PostPage: NextPageWithAuthAndLayout = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const utils = trpc.useContext();
  const postQueryPathAndInput = getPostQueryPathAndInput(
    Number(router.query.id)
  );
  const postQuery = trpc.useQuery(postQueryPathAndInput);
  const likeMutation = trpc.useMutation(['post.like'], {
    onMutate: async (likedPostId) => {
      await utils.cancelQuery(postQueryPathAndInput);

      const previousPost = utils.getQueryData(postQueryPathAndInput);

      if (previousPost) {
        utils.setQueryData(postQueryPathAndInput, {
          ...previousPost,
          likedBy: [
            ...previousPost.likedBy,
            { user: { id: session!.user.id, name: session!.user.name } }
          ]
        });
      }

      return { previousPost };
    },
    onError: (err, id, context: any) => {
      if (context?.previousPost) {
        utils.setQueryData(postQueryPathAndInput, context.previousPost);
      }
    }
  });
  const unlikeMutation = trpc.useMutation(['post.unlike'], {
    onMutate: async (unlikedPostId) => {
      await utils.cancelQuery(postQueryPathAndInput);

      const previousPost = utils.getQueryData(postQueryPathAndInput);

      if (previousPost) {
        utils.setQueryData(postQueryPathAndInput, {
          ...previousPost,
          likedBy: previousPost.likedBy.filter(
            (item) => item.user.id !== session!.user.id
          )
        });
      }

      return { previousPost };
    },
    onError: (err, id, context: any) => {
      if (context?.previousPost) {
        utils.setQueryData(postQueryPathAndInput, context.previousPost);
      }
    }
  });
  const [isConfirmDeleteDialogOpen, setIsConfirmDeleteDialogOpen] =
    React.useState(false);
  const [isConfirmHideDialogOpen, setIsConfirmHideDialogOpen] =
    React.useState(false);
  const [isConfirmUnhideDialogOpen, setIsConfirmUnhideDialogOpen] =
    React.useState(false);

  function handleHide() {
    setIsConfirmHideDialogOpen(true);
  }

  function handleUnhide() {
    setIsConfirmUnhideDialogOpen(true);
  }

  function handleEdit() {
    router.push(`/post/${postQuery.data?.id}/edit`);
  }

  function handleDelete() {
    setIsConfirmDeleteDialogOpen(true);
  }

  if (postQuery.data) {
    const isUserAdmin = session!.user.role === 'ADMIN';
    const postBelongsToUser = postQuery.data.author.id === session!.user.id;

    return (
      <>
        <Head>
          <title>{postQuery.data.title} - Tameablemist</title>
        </Head>
      </>
    );
  }

  if (postQuery.isError) {
    return <div>Error: {postQuery.error.message}</div>;
  }

  return (
    <div className="animate-pulse">
      <div className="w-3/4 bg-gray-200 rounded h-9 dark:bg-gray-700" />
      <div className="flex items-center gap-4 mt-6">
        <div className="w-12 h-12 bg-gray-200 rounded-full dark:bg-gray-700" />
        <div className="flex-1">
          <div className="w-24 h-4 bg-gray-200 rounded dark:bg-gray-700" />
          <div className="w-32 h-3 mt-2 bg-gray-200 rounded dark:bg-gray-700" />
        </div>
      </div>
      <div className="space-y-3 mt-7">
        {[...Array(3)].map((_, idx) => (
          <React.Fragment key={idx}>
            <div className="grid grid-cols-3 gap-4">
              <div className="h-5 col-span-2 bg-gray-200 rounded dark:bg-gray-700" />
              <div className="h-5 col-span-1 bg-gray-200 rounded dark:bg-gray-700" />
            </div>
            <div className="w-1/2 h-5 bg-gray-200 rounded dark:bg-gray-700" />
            <div className="grid grid-cols-3 gap-4">
              <div className="h-5 col-span-1 bg-gray-200 rounded dark:bg-gray-700" />
              <div className="h-5 col-span-2 bg-gray-200 rounded dark:bg-gray-700" />
            </div>
            <div className="w-3/5 h-5 bg-gray-200 rounded dark:bg-gray-700" />
          </React.Fragment>
        ))}
      </div>
      <div className="flex gap-4 mt-6">
        <div className="w-16 border rounded-full h-[34px] border-secondary" />
        <div className="w-16 border rounded-full h-[34px] border-secondary" />
      </div>
    </div>
  );
};

PostPage.auth = true;

export default PostPage;
