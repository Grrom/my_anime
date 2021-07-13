<template>
  <div>{{ greeting }}</div>
  <button v-on:click="alert">click</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  data() {
    return {
      greeting: "hello world",
    };
  },
  methods: {
    alert() {
      window.alert("hello world");
    },
  },
});
</script>
