<template>
  <main>
    <anime-player></anime-player>
    <anime-sidebar :animeList="animeList"></anime-sidebar>
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
    return {
      animeList: {},
    };
  },
  methods: {
    fetchLocalAnimes() {
      fetch("http://127.0.0.1:3000/anime-list", {
        credentials: "same-origin",
      })
        .then((response) => response.json())
        .then((data) => {
          this.animeList = data;
        })
        .catch((error) => console.warn(error));
    },
  },
  mounted() {
    this.fetchLocalAnimes();
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
