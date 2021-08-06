<template>
  <div class="player-frame">
    <video class="player" ref="player" controls autoplay></video>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, ref } from "vue";
import { WatchedEpisode } from "../types/Anime";

const emitter = require("tiny-emitter/instance");

export default defineComponent({
  name: "animePlayer",
  setup() {
    const serverUrl = inject("serverUrl");

    const player = ref();

    let currentlyPlaying: WatchedEpisode;

    function saveTimeStamp() {
      if (currentlyPlaying !== undefined) {
        fetch(serverUrl + "save-progress", {
          credentials: "same-origin",
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: currentlyPlaying.name,
            episode: currentlyPlaying.episode,
            timeStamp: player.value.currentTime,
          }),
        })
          .then((response) => response.json())
          .then((data) => {})
          .catch((error) => console.warn(error));
      }

      emitter.emit("update-local-timeStamp", player.value.currentTime);
    }

    window.onunload = () => {
      if (currentlyPlaying !== undefined) saveTimeStamp();
    };

    onMounted(() =>
      emitter.on(
        "play-episode",
        (anime: String, episode: String, timeStamp: number) => {
          saveTimeStamp();
          player.value.src = `${serverUrl}video?anime=${anime}&episode=${episode}`;
          player.value.currentTime = timeStamp;
          currentlyPlaying = {
            name: anime,
            episode: episode,
          };
        }
      )
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