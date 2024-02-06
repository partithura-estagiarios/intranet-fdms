<template>
  <div class="custom-separator">
    <div class="line"></div>
    <div class="text">
      <h5 class="custom-text">{{ texto }}</h5>
    </div>
    <div class="line"></div>
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
.custom-separator {
  display: flex;
  border: 0;
  padding: 0;
}
.line {
  flex-grow: 1;
  border-bottom: 10px solid var(--separator-color, #367c1e);
  height: 15px;
}
.text {
  padding: 0 2% 1px; /* Exemplo de ajuste responsivo */
  background-color: rgba(0, 159, 0, 255);
  border-radius: 3px;
  color: white;
  z-index: 1;
  bottom: 17px;
  position: relative;
}
.custom-text {
  margin: 0;
  padding: 5px 0;
  font-weight: bold;
  font-size: xx-large;
}
</style>
