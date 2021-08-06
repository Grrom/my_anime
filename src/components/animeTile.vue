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
        :key="episode"
        :episodeData="episode"
        :animeName="name"
        @play-episode="playEpisode"
        class="anime-episode"
      ></anime-episode>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref, watch } from "vue";
import { WatchedEpisode } from "../types/Anime";

import animeEpisode from "./animeEpisode.vue";
const emitter = require("tiny-emitter/instance");

export default defineComponent({
  name: "animeTile",
  components: {
    animeEpisode,
  },
  props: {
    name: String,
    episodes: Array,
  },
  setup(props) {
    const showEpisodes = ref(false);
    const tile = ref();

    const serverUrl = inject("serverUrl");

    function toggleEpisodes() {
      showEpisodes.value = !showEpisodes.value;
    }

    function playEpisode(episode: String, timeStamp: number) {
      emitter.emit("play-episode", props.name, episode, timeStamp);
      saveProgress({ name: props.name!, episode: episode });
    }

    function saveProgress(episode: WatchedEpisode) {
      fetch(serverUrl + "save-progress", {
        credentials: "same-origin",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(episode),
      })
        .then((response) => response.json())
        .then((data) => {})
        .catch((error) => console.warn(error));
    }

    watch(showEpisodes, (active: boolean) => {
      if (active) {
        tile.value?.classList.add("active");
      } else {
        tile.value?.classList.remove("active");
      }
    });

    return {
      tile,
      showEpisodes,
      toggleEpisodes,
      playEpisode,
    };
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

  @include shadow;

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