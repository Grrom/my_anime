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

    function playEpisode(event: Event) {
      event.stopPropagation();

      emitter.emit("unhighlight-episode");
      highlight(true);

      context.emit("play-episode", props.episodeData?.episode);
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
  border: 0.1em solid $white;
  background-color: $primaryDark;

  @include hover-highlight($primaryLight);
  @extend .rounded-border;
  @extend .hover-pointer;
}

.watched {
  color: rgba($white, 0.3);
  background-color: $primaryAccent;
  border: 0.1em solid rgba($white, 0.3);
}
</style>