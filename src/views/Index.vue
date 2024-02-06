<template>
  <div class="title">
    <h1>{{ $t("about") }}</h1>
  </div>
</template>

<script setup lang="ts">
import { router } from "../modules";

onMounted(() => {
  router.push("/login");
});
</script>

<style scoped>
.title {
  will-change: filter;
}
.title:hover {
  filter: drop-shadow(0 0 2em #646cffff);
}
</style>
