<template>
  <div class="sidebar">
    <anime-tile
      v-for="(episodes, name) in animeList"
      :key="name + selectedEpisode.episode"
      :name="name"
      :episodes="episodes"
      @selected="selectAnimeEpisode"
    ></anime-tile>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import animeTile from "./animeTile.vue";

export default defineComponent({
  name: "animeSidebar",
  components: {
    animeTile,
  },
  props: {
    animeList: Object,
  },
  setup() {
    const selectedEpisode = ref({});

    function selectAnimeEpisode(animeEpisode: { String: StringConstructor }) {
      selectedEpisode.value = animeEpisode;
    }

    return {
      selectedEpisode,
      selectAnimeEpisode,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";
@import "../styles/mixins.scss";
@import "../styles/extension.scss";

.sidebar {
  background: $primaryDark;
  padding: 0.1em;

  @extend .rounded-border;
  @include shadow;

  @include desktop {
    width: 20vw;
    height: 100vh;
  }

  @include mobile {
    width: 95vw;
    margin: 0.2em auto;
  }
}
</style>