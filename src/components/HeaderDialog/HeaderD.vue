<template>
  <q-card-section class="bg-indigo-8 row justify-between text-white">
    <div class="q-pa-md text-h5">{{ props.option }}</div>
    <q-icon
      name="close"
      class="pt-2 cursor-pointer"
      size="45px"
      @click="emits('close', false)"
    />
  </q-card-section>
</template>

<script setup lang="ts">
const emits = defineEmits(["close"]);
const props = defineProps({
  option: {
    type: String,
    required: true,
  },
});
</script>
