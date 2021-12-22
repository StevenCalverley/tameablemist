import type { Track } from '../lib/spotify/types';

export default function Track(track: Track & { ranking: number }) {
  return (
    <div className="flex flex-row items-baseline  max-w-3xl w-full py-3">
      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
        {track.ranking}
      </p>
      <div className="flex flex-col pl-3">
        <a
          className="font-medium text-gray-900 dark:text-gray-100 truncate w-60 sm:w-96 md:w-full"
          href={track.songUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {track.title}
        </a>
        <p className="text-gray-600 truncate w-60 sm:w-96 md:w-full">
          {track.artist}
        </p>
      </div>
    </div>
  );
}
