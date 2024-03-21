<template>
  <div>
    <h1>{{ $t("about") }}</h1>
  </div>
</template>

<script setup lang="ts">
import { router } from "../modules";

onMounted(() => {
  router.push("/scheduleRoom");
});
</script>
