<template>
  <div class="anime-tile" v-on:click="toggleEpisodes" ref="tile">
    <span class="anime-title">{{ name }}</span>
    <div
      v-show="showEpisodes"
      class="episode-list"
      @click="$event.stopPropagation()"
    >
      <anime-episode
        v-for="episode in episodes"
        :key="selectedEpisode + episode"
        :episodeNumber="episode"
        :isActive="selectedEpisode === episode"
        @selected="selectEpisode"
        class="anime-episode"
      ></anime-episode>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import animeEpisode from "./animeEpisode.vue";

export default defineComponent({
  name: "animeTile",
  components: {
    animeEpisode,
  },
  props: {
    name: String,
    episodes: Array,
    isSelected: Boolean,
  },
  data() {
    return {
      showEpisodes: false,
      selectedEpisode: this.episodes[0],
    };
  },
  watch: {
    showEpisodes(active) {
      if (active) {
        this.$refs.tile.classList.add("active");
      } else {
        this.$refs.tile.classList.remove("active");
      }
    },
  },
  methods: {
    toggleEpisodes() {
      this.showEpisodes = !this.showEpisodes;
    },
    selectEpisode(episodeNumber) {
      this.$emit("selected", { name: this.name, episode: episodeNumber });
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";
@import "../styles/mixins.scss";
@import "../styles/extension.scss";

.anime-tile {
  text-transform: capitalize;
  background-color: $primaryDark;
  border: 1px solid $white;
  color: $white;
  padding: 0.4em;
  margin: 0.4em;

  @include hover-highlight($primary);
  @extend .hover-pointer;
  @extend .hover-elevate;
  @extend .rounded-border;
}

.episode-list {
  background-color: $primaryAccent;
  display: flex;
  list-style: none;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 0.25em;

  @extend .rounded-border;
}
</style>