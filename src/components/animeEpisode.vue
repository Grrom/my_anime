<template>
  <small v-on:click="playEpisode($event)" ref="episode">
    {{ episodeData.episode.split(".")[0] }}
  </small>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

const emitter = require("tiny-emitter/instance");

export default defineComponent({
  name: "animeEpisode",
  props: {
    episodeData: Object,
  },
  setup(props, context) {
    const episode = ref();

    let localTimeStamp = props.episodeData?.timeStamp;

    function playEpisode(event: Event) {
      event.stopPropagation();

      emitter.emit("unhighlight-episode");
      highlight(true);

      context.emit("play-episode", props.episodeData?.episode, localTimeStamp);

      emitter.on("update-local-timeStamp", (timeStamp: number) => {
        localTimeStamp = timeStamp;
        emitter.off("update-local-timeStamp");
      });
    }

    function highlight(on: boolean) {
      if (on) {
        episode.value.classList.add("active");

        emitter.on("unhighlight-episode", () => {
          highlight(false);
          emitter.off("unhighlight-episode");
          episode.value.classList.add("watched");
        });
      } else {
        episode.value.classList.remove("active");
      }
    }

    onMounted(() => {
      if (props.episodeData?.watched) {
        episode.value.classList.add("watched");
      }
    });

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

.anime-episode {
  margin: 0.2em;
  padding: 0.2em;
  border: 0.1em solid $primaryAccent;
  background-color: $primaryLight;

  @include hover-highlight($primaryLighter);
  @extend .rounded-border;
  @extend .hover-pointer;
  @extend .hover-elevate;
}

.watched {
  color: rgba($primaryAccent, 0.3);
  background-color: $primaryLight;
  border: 0.1em solid rgba($primaryAccent, 0.3);
}
</style>
