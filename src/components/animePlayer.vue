<template>
  <div class="player-frame">
    <video ref="player" width="650" controls muted="muted" autoplay></video>
    <button @click="reqVid">req vid</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "animePlayer",
  setup() {
    const player = ref();

    function reqVid() {
      fetch("http://127.0.0.1:3000/video", {
        credentials: "same-origin",
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

    return {
      player,
      reqVid,
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

  @include shadow;
  @extend .rounded-border;

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
</style>