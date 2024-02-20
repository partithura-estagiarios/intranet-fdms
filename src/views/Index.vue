<template></template>

<script setup lang="ts">
import { router } from "../modules";

onMounted(() => {
  router.push("/login");
});
</script>
