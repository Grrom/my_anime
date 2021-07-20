<template>
  <small class="episode" v-on:click="playEpisode($event)" :ref="episodeNumber">
    {{ episodeNumber.split(".")[0] }}
  </small>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";

export default defineComponent({
  name: "animeEpisode",
  props: {
    episodeNumber: String,
    isActive: Boolean,
  },
  setup(props, context) {
    function playEpisode(event: Event) {
      event.stopPropagation();
      context.emit("selected", props.episodeNumber);
    }

    function highlight() {
      if (props.isActive) {
        // props.refs[this.episodeNumber].classList.add("active");
      } else {
        // this.$refs[this.episodeNumber].classList.remove("active");
      }
    }

    onMounted(highlight);
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