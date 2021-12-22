import type { NextApiRequest, NextApiResponse } from 'next';
import type { TrackApiResponse } from '../../lib/spotify/types';

import { getTopTracks } from '../../lib/spotify';

type Track = {
  artist: string;
  songUrl: string;
  title: string;
};

const Tracks = async (req: NextApiRequest, res: NextApiResponse<Track[]>) => {
  const tracks = await getTopTracks();

  return res.status(200).json(tracks);
};

export default Tracks;
