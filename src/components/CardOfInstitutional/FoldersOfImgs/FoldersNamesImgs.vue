<template>
  <q-list>
    <q-item
      clickable
      v-for="name in foldersName"
      :key="name"
      class="text-no-wrap q-py-lg"
      :class="itemClasses(name)"
      @click="selectItem(name)"
    >
      {{ name }}
    </q-item>
  </q-list>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";
const emits = defineEmits(["envity-name"]);
const selectedItem = ref<string | null>(null);

function selectItem(name: string) {
  selectedItem.value = name;
  emits("envity-name", name);
}
const props = defineProps({
  foldersName: {
    type: Array as () => string[],
    required: true,
  },
});
const itemClasses = computed(() => {
  return (name: string) => {
    const isSelected = selectedItem.value === name;
    if (isSelected) {
      return "bg-green text-white";
    }
    return "text-black";
  };
});
</script>
