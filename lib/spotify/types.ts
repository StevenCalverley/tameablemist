export type Image = {
  url: string;
};
export type ArtistResponse = {
  name: string;
};

export type AlbumResponse = {
  name: string;
  images: Image[];
};

export type TrackResponse = {
  artists: ArtistResponse[];
  name: string;
  external_urls: {
    spotify: string;
  };
};

export type SongResponse = {
  artists: ArtistResponse[];
  album: AlbumResponse;
  name: string;
  external_urls: {
    spotify: string;
  };
};

export type TrackApiResponse = {
  items: TrackResponse[];
};

export type PlayingApiResponse = {
  is_playing: boolean;
  item: SongResponse;
};

export type Track = {
  artist: string;
  songUrl: string;
  title: string;
};
