<template>
  <div class="line relative-position flex justify-center">
    <div class="text bg-green relative-position q-px-xl">
      <h4 class="text-white text-bold gt-sm inline">{{ texto }}</h4>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  texto: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.line {
  border-bottom: 10px solid var(--separator-color, #367c1e);
}
.text {
  top: 20px;
  border-radius: 5px;
}
</style>
