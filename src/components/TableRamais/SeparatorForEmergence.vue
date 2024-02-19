<template>
  <div class="line relative-position flex justify-center">
    <div class="text bg-red relative-position" :style="{ width: large }">
      <q-icon name="phone" class="text-white mr-2 mb-1" size="2em" />
      <h5 class="text-white text-bold inline">{{ texto }}</h5>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  texto: String,
  large: String,
});
</script>

<style scoped>
.line {
  border-bottom: 5px solid var(--separator-color, #e50101);
}
.text {
  top: 35px;
  border: 5px solid white;
  background-color: red;
  padding: 10px;
  outline: 5px solid red;
  border-radius: 50px;
}
</style>
