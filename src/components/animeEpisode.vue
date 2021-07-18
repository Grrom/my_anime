<template>
  <div>{{ episodeNumber }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "animeEpisode",
  props: {
    episodeNumber: String,
  },
});
</script>

<style lang="sass" scoped>
</style>