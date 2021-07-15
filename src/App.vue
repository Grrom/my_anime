<template>
  <main>
    <anime-player></anime-player>
    <anime-sidebar></anime-sidebar>
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

<style lang="scss" scoped>
@import "./styles/variables.scss";
@import "./styles/mixins.scss";

main {
  display: flex;
  flex-direction: row-reverse;
  margin: 0;
  padding: 0;

  @include desktop {
  }

  @include mobile {
    display: block;
    padding-top: 5vh;
  }
}
</style>
