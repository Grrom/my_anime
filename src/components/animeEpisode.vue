<template>
  <small class="episode" v-on:click="playEpisode($event)" :ref="episodeNumber">
    {{ episodeNumber.split(".")[0] }}
  </small>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "animeEpisode",
  props: {
    episodeNumber: String,
    isActive: Boolean,
  },
  methods: {
    playEpisode(event) {
      event.stopPropagation();
      this.$emit("selected", this.episodeNumber);
    },
  },
  mounted() {
    if (this.isActive) {
      this.$refs[this.episodeNumber].classList.add("active");
    } else {
      this.$refs[this.episodeNumber].classList.remove("active");
    }
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