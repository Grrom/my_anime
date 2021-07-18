<template>
  <div class="sidebar">
    <anime-tile
      v-for="(episodes, name) in animeList"
      :key="name"
      :name="name"
      :episodes="episodes"
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
});
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";
@import "../styles/mixins.scss";

.sidebar {
  background: $primaryDark;

  @include desktop {
    width: 20vw;
    height: 100vh;
  }

  @include mobile {
    width: 95vw;
    margin: 8px auto;
  }
}
</style>