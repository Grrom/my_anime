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
import { defineComponent } from "vue";

import animeTile from "./animeTile.vue";

export default defineComponent({
  name: "animeSidebar",
  components: {
    animeTile,
  },
  props: {
    animeList: Object,
  },
  data() {
    return {
      selectedEpisode: { String: String },
    };
  },
  methods: {
    selectAnimeEpisode(animeEpisode) {
      this.selectedEpisode = animeEpisode;
      console.log(this.selectedEpisode);
      console.log(JSON.parse(JSON.stringify(this.animeList)));
    },
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