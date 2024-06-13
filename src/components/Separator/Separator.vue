<template>
  <q-separator class="color-separator" size="1vh" />
  <img src="/SEPARATOR.png" />
  <h4 class="text-bold text-white position-text">{{ texto }}</h4>
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
.color-separator {
  background-color: rgba(0, 152, 1, 255);
}
.position-text {
  font-family: Fira Sans;
  bottom: 6rem;
  position: relative;
}
</style>
