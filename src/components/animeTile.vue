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
        :episodeNumber="episode"
        :animeName="name"
        class="anime-episode"
      ></anime-episode>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from "vue";

import animeEpisode from "./animeEpisode.vue";

export default defineComponent({
  name: "animeTile",
  components: {
    animeEpisode,
  },
  props: {
    name: String,
    episodes: Array,
  },
  setup(props, context) {
    const showEpisodes = ref(false);
    const tile = ref();

    function toggleEpisodes() {
      showEpisodes.value = !showEpisodes.value;
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