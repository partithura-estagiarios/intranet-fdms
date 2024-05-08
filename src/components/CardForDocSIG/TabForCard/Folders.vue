<template>
  <q-virtual-scroll
    class="size-area"
    :items="props.folders"
    v-slot="{ item, index }"
  >
    <q-item clickable v-ripple @click="selectFolder(item)">
      {{ item.name }}
    </q-item>
  </q-virtual-scroll>
</template>
<script setup lang="ts">
const emits = defineEmits(["close"]);
const props = defineProps({
  folders: {
    type: Array,
    required: true,
  },
});
function selectFolder(folder: string) {
  emits("close", folder);
}
</script>
<style scoped>
.size-area {
  height: 50vh;
  width: 50vh;
}
</style>
