interface Episode {
    number: String;
    isSelected: Boolean;
}

interface Anime {
    name: String;
    episodes: Array<Episode>;
}