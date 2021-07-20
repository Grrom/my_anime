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
import { defineComponent, reactive, ref, watch } from "vue";

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
  setup(props, context) {
    const selectedEpisode = ref("hello");
    const showEpisodes = ref(false);

    function toggleEpisodes() {
      showEpisodes.value = !showEpisodes.value;
    }

    function selectEpisode(episodeNumber: String) {
      context.emit("selected", { name: props.name, episode: episodeNumber });
    }

    watch(showEpisodes, (active) => {
      if (active) {
        // this.$refs.tile.classList.add("active");
      } else {
        // this.$refs.tile.classList.remove("active");
      }
    });

    return {
      selectedEpisode,
      showEpisodes,
      toggleEpisodes,
      selectEpisode,
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