<template>
  <q-img :src="props.img" />
</template>
<script setup lang="ts">
const props = defineProps({
  img: {
    type: String,
    required: true,
  },
});
</script>
