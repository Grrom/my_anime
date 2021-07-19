<template>
  <div class="player"></div>
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
@import "../styles/extension.scss";

.player {
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