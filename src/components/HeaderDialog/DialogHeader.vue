<template>
  <q-card-section class="custom-color row justify-between text-white">
    <div class="q-pa-md text-h5">{{ $t("action." + props.option) }}</div>
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
<style scoped>
.custom-color {
  background-color: rgb(31, 73, 125);
}
</style>
