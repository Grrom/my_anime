<template>
  <div class="sidebar">
    sidebar
    <anime-tile></anime-tile>
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
});
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";
@import "../styles/mixins.scss";

.sidebar {
  background: $bgLight;

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