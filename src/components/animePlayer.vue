<template>
  <div class="player-frame">
    <video class="player" ref="player" controls muted="muted" autoplay></video>
  </div>
  <!-- <button @click="reqVid">req vid</button>
  <button @click="testing">testing</button> -->
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, ref } from "vue";

const emitter = require("tiny-emitter/instance");

export default defineComponent({
  name: "animePlayer",
  setup() {
    const serverUrl = inject("serverUrl");

    const player = ref();

    function testing() {
      fetch(`${serverUrl}/testing?foo=bad&baz=foo`, {
        credentials: "same-origin",
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.warn(error));
    }

    function reqVid(anime: String, episode: String) {
      fetch(`${serverUrl}video?anime=${anime}&episode=${episode}`, {
        credentials: "same-origin",
        method: "GET",
      })
        .then((response) => response.body)
        .then((body) => {
          console.log(body);
          const reader = body?.getReader();

          return new ReadableStream({
            start(controller) {
              return pump();
              function pump(): Promise<any> | undefined {
                return reader?.read().then(({ done, value }) => {
                  console.log(value);
                  if (done) {
                    controller.close();
                    return;
                  }
                  controller.enqueue(value);
                  return pump();
                });
              }
            },
          });
        })
        .then((stream) => new Response(stream))
        .then((response) => response.blob())
        .then((blob) => URL.createObjectURL(blob))
        .then((url) => {
          console.log((player.value.src = url));
          player.value.load();
          player.value.onloadeddata = function () {
            player.value.play();
          };
        })
        .catch((err) => console.error(err));
    }

    onMounted(() =>
      emitter.on("play-episode", (anime: String, episode: String) => {
        console.log(anime);
        console.log(episode);
        reqVid(anime, episode);
      })
    );

    return {
      player,
      reqVid,
      testing,
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
  object-fit: inherit;
  margin: auto;

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