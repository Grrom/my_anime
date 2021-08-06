<template>
  <main>
    <anime-sidebar :animeList="animeList"></anime-sidebar>
    <anime-player></anime-player>
  </main>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, ref } from "vue";

import animePlayer from "./components/animePlayer.vue";
import animeSidebar from "./components/animeSidebar.vue";
import { Anime } from "./types/Anime";

export default defineComponent({
  components: {
    animeSidebar,
    animePlayer,
  },
  name: "App",
  setup() {
    const animeList = ref<Array<Anime>>([]);
    const serverUrl = inject("serverUrl");

    function fetchLocalAnimes() {
      fetch(serverUrl + "anime-list", {
        credentials: "same-origin",
      })
        .then((response) => response.json())
        .then((data) => {
          Object.keys(data).forEach((animeName) => {
            animeList.value.push({
              name: animeName,
              episodes: data[animeName],
            });
          });
        })
        .catch((error) => console.warn(error));
    }

    onMounted(fetchLocalAnimes);

    return {
      animeList,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "./styles/variables.scss";
@import "./styles/mixins.scss";

main {
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;

  @include desktop {
  }

  @include mobile {
    flex-direction: column-reverse;
    padding-top: 5vh;
  }
}
</style>
