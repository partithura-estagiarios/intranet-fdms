<template>
  <BarUp v-if="showTabHeader" />
  <BackgroundIntranet v-if="showTabHeader" />
  <RouterView />
</template>
<script setup lang="ts">
const exceptionRoutes = ["/login"];
const showTabHeader = computed(() => {
  const currentRoute = useRoute();
  return !exceptionRoutes.some((route) => currentRoute.path.includes(route));
});
</script>
