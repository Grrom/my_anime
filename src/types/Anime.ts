export interface Anime {
    name: String;
    episodes: Array<{ episode: String, watched: Boolean }>;
}

export interface WatchedEpisode {
    name: String,
    episode: String,
}