<template>
  <div class="player">Player</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "animePlayer",
});
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";
@import "../styles/mixins.scss";

.player {
  background: $bgLight;
  max-width: 95vw;
  min-width: 70vw;
  margin: auto;

  @include desktop {
    min-height: 70vh;
  }

  @include mobile {
    min-height: 50vw;
  }
}
</style>