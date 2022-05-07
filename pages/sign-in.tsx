import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType
} from 'next';
import { getServerSession } from 'next-auth/next';
import { getProviders, signIn } from 'next-auth/react';
import Head from 'next/head';

import { authOptions } from '@/lib/auth';

const SignIn = ({
  providers
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>Sign In - Tameablemist</title>
      </Head>

      <main className="relative flex items-center justify-center h-full bg-center bg-circle-grid dark:bg-circle-grid-dark">
        <div className="w-full space-y-4 text-center bg-primary">
          {Object.values(providers!).map((provider) => (
            <div key={provider.name}>
              <button onClick={() => signIn(provider.id)}>
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerSession(context, authOptions);
  const providers = await getProviders();

  if (session?.user) {
    return {
      redirect: {
        permanent: false,
        destination: '/'
      },
      props: { providers }
    };
  }

  return {
    props: { providers }
  };
};

export default SignIn;
