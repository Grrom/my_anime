<template>
  <main>
    <anime-sidebar></anime-sidebar>
    <anime-player></anime-player>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import animePlayer from "./components/animePlayer.vue";
import animeSidebar from "./components/animeSidebar.vue";

export default defineComponent({
  components: {
    animeSidebar,
    animePlayer,
  },
  name: "App",
  data() {
    return {};
  },
  methods: {},
});
</script>

<style lang="scss">
$primary: #007ae6;
$primaryLight: #99cfff;
$primaryDark: #005299;

$bgDark: #1a1a1a;
$bgLight: #999;

body {
  background: $bgDark;
}

main {
  display: flex;
}
</style>
