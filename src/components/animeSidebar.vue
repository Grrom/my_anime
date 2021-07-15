<template>
  <div>
    Sidebar
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

<style lang="sass" scoped>
</style>