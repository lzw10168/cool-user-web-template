<script setup lang="ts">
import TheWelcome from "../components/TheWelcome.vue";
import { useCool, useStore } from "/@/cool";
const { service, refs, setRefs } = useCool();
</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
