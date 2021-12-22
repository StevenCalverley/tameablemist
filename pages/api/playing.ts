import type { NextApiRequest, NextApiResponse } from 'next';
import type { PlayingApiResponse } from '../../lib/spotify/types';

import { getNowPlaying } from '../../lib/spotify';

export type Playing =
  | {
      album: string;
      albumImageUrl: string;
      artist: string;
      isPlaying: true;
      songUrl: string;
      title: string;
    }
  | { isPlaying: false };

const NowPlaying = async (
  req: NextApiRequest,
  res: NextApiResponse<Playing>
) => {
  const response = await getNowPlaying();

  if (response.status === 204 || response.status > 400) {
    return res.status(200).json({ isPlaying: false });
  }

  const song: PlayingApiResponse = await response.json();

  const isPlaying = song.is_playing;
  const title = song.item.name;
  const artist = song.item.artists.map((_artist) => _artist.name).join(', ');
  const album = song.item.album.name;
  const albumImageUrl = song.item.album.images[0].url;
  const songUrl = song.item.external_urls.spotify;

  return res.status(200).json({
    album,
    albumImageUrl,
    artist,
    isPlaying,
    songUrl,
    title
  });
};

export default NowPlaying;
