<template>
  <q-menu :auto-close="false" v-model="props.enablePicker" class="text-black">
    <q-item
      clickable
      v-close-popup
      v-for="item in options"
      @click="emits('auto-close', value)"
    >
      <q-item-section>{{ item.name }} </q-item-section>
    </q-item>
  </q-menu>
</template>

<script setup lang="ts">
const emits = defineEmits(["auto-close"]);
const props = defineProps({
  enablePicker: {
    type: Boolean,
    required: true,
  },
});
const value = ref();
const options = [
  { name: "Diariamente" },
  { name: "Não" },
  { name: "Semanalmente" },
];
</script>
