import type { Track as TTrack } from '../lib/spotify/types';

import Track from './Track';

const Tracks = ({ tracks }: { tracks: TTrack[] }) => {
  return (
    <div className="">
      <h3 className="font-bold text-3xl tracking-tight text-gray-800 dark:text-gray-100">
        Top Tracks
      </h3>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Curious what I&apos;m currently listening to? Here&apos;s my top tracks
        on Spotify updated daily.
      </p>

      <div className="mt-1 divide-y">
        {tracks &&
          tracks.map((track, idx) => (
            <Track key={idx} ranking={idx + 1} {...track} />
          ))}
      </div>
    </div>
  );
};

export default Tracks;
