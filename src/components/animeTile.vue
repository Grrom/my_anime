<template>
  <div>
    {{ name }}
  </div>
  <div>
    <anime-episode
      v-for="episode in episodes"
      :key="episode"
      :episodeNumber="episode"
      class="anime-episode"
    ></anime-episode>
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
  },
  data() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";
.anime-episode {
  border-bottom: 1px solid $white;
}
</style>