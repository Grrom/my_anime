<template>
  <small class="episode" v-on:click="playEpisode($event)" ref="episode">
    {{ episodeNumber.split(".")[0] }}
  </small>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

const emitter = require("tiny-emitter/instance");

export default defineComponent({
  name: "animeEpisode",
  props: {
    episodeNumber: String,
  },
  setup(props, context) {
    const episode = ref();

    function playEpisode(event: Event) {
      emitter.on("highlight-episode", () => {
        highlight(true);
        emitter.off("highlight-episode");
      });

      event.stopPropagation();
      emitter.emit("request-highlight");
    }

    function highlight(on: boolean) {
      if (on) {
        episode.value.classList.add("active");
        emitter.on("unhighlight-episode", () => {
          highlight(false);
          emitter.off("unhighlight-episode");
        });
      } else {
        episode.value.classList.remove("active");
      }
    }

    return {
      episode,
      playEpisode,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";
@import "../styles/mixins.scss";
@import "../styles/extension.scss";

.episode {
  margin: 0.2em;
  padding: 0.2em;
  border: 0.1em solid $white;

  @include hover-highlight($primaryLight);
  @extend .rounded-border;
  @extend .hover-pointer;
}
</style>