<template>
  <main>
    <anime-sidebar :animeList="animeList"></anime-sidebar>
    <anime-player></anime-player>
  </main>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

import animePlayer from "./components/animePlayer.vue";
import animeSidebar from "./components/animeSidebar.vue";

export default defineComponent({
  components: {
    animeSidebar,
    animePlayer,
  },
  name: "App",
  setup() {
    const animeList = ref({});
    function fetchLocalAnimes() {
      fetch("http://127.0.0.1:3000/anime-list", {
        credentials: "same-origin",
      })
        .then((response) => response.json())
        .then((data) => {
          animeList.value = data;
        })
        .catch((error) => console.warn(error));
    }

    onMounted(fetchLocalAnimes);
    onMounted(() => console.log("it works now"));

    return {
      animeList,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "./styles/variables.scss";
@import "./styles/mixins.scss";

// FONTS
@font-face {
  font-family: "Nunito";
  src: url(./assets/fonts/Nunito/Nunito-Regular.ttf) format("truetype");
}

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
