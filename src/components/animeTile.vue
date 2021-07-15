<template>
  <div>
    tile
    <anime-episode></anime-episode>
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
});
</script>

<style lang="sass" scoped>
</style>