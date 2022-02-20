import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import { SWRConfig } from 'swr';
import Head from 'next/head';

import { getTopTracks } from '../lib/spotify';
import type { Track } from '../lib/spotify/types';

import Tracks from '../components/Tracks';
import NowPlaying from '../components/NowPlaying';

export const getStaticProps: GetStaticProps = async () => {
  const res = await getTopTracks();

  return {
    props: {
      tracks: res
    }, // will be passed to the page component as props
    revalidate: 86400 // 1 Day
  };
};

const Home: NextPage<{ tracks: Track[] }> = ({ tracks }) => {
  return (
    <div>
      <Head>
        <title>Tameblemist</title>
        <meta name="description" content="Tameablemist personal website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto max-w-3xl py-8">
        <Tracks tracks={tracks} />
        <footer className="mt-8 py-4 border-t">
          <NowPlaying />
        </footer>
      </main>
    </div>
  );
};

export default Home;
