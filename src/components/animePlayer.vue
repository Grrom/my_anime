<template>
  <div class="player-frame">
    <video class="player" ref="player" controls autoplay></video>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, ref } from "vue";

const emitter = require("tiny-emitter/instance");

export default defineComponent({
  name: "animePlayer",
  setup() {
    const serverUrl = inject("serverUrl");

    const player = ref();

    onMounted(() =>
      emitter.on("play-episode", (anime: String, episode: String) => {
        player.value.src = `${serverUrl}video?anime=${anime}&episode=${episode}`;
      })
    );

    return {
      player,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";
@import "../styles/mixins.scss";
@import "../styles/extension.scss";

.player-frame {
  background: $primaryLight;
  margin: auto;
  display: flex;
  justify-content: center;

  @extend .rounded-border;

  @include shadow;

  @include desktop {
    height: 300px;
    width: 300px;
    min-height: 70vh;
    min-width: 70vw;
  }

  @include mobile {
    min-height: 50vw;
    min-width: 95vw;
    margin-bottom: 2vw;
  }
}

.player {
  @extend .rounded-border;

  @include desktop {
    max-height: 70vh;
    max-width: 70vw;
  }

  @include mobile {
    max-height: 50vw;
    max-width: 95vw;
  }
}
</style>