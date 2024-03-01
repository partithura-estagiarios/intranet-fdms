<template>
  <BarUp v-if="showTabHeader" />
  <BackgroundIntranet v-if="showTabHeader" />
  <RouterView />
</template>
<script setup lang="ts">
const exceptionRoutes = ["/login"];
const showTabHeader = computed(() => {
  return !exceptionRoutes.some((route) =>
    window.location.pathname.includes(route),
  );
});
</script>
