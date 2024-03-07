<template>
  <q-img class="img" :src="props.img" />
</template>
<script setup lang="ts">
const props = defineProps({
  img: {
    type: String,
    required: true,
  },
});
</script>
<style scoped>
.img {
  top: 50px;
}
</style>
