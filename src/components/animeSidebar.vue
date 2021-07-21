<template>
  <div class="sidebar">
    <anime-tile
      v-for="anime in animeList"
      :key="anime.name"
      :name="anime.name"
      :episodes="anime.episodes"
    ></anime-tile>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

import animeTile from "./animeTile.vue";

const emitter = require("tiny-emitter/instance");

export default defineComponent({
  name: "animeSidebar",
  components: {
    animeTile,
  },
  props: {
    animeList: Array,
  },
  setup() {
    return {};
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