<template>
  <q-card-section>
    <q-virtual-scroll
      class="maximum-scroll"
      :items="folderTree"
      v-slot="{ item, index }"
    >
      <q-item
        clickable
        v-ripple
        @click="emits('selectFolderTree', index, item.name)"
        v-model="link"
        :class="folderClass(index)"
      >
        <q-item-section :class="textClass(index)">{{
          item.name
        }}</q-item-section>
      </q-item>
    </q-virtual-scroll>
  </q-card-section>
</template>

<script setup lang="ts">
const props = defineProps({
  folderTree: {
    type: Array,
    required: true,
  },
});
const emits = defineEmits(["selectFolderTree"]);
const activeButtonIndex = ref();
const link = ref();

const textClass = computed(() => {
  return (index: number) => ({
    "text-white": activeButtonIndex.value === index,
  });
});
const folderClass = computed(() => {
  return (index: number) => ({
    "bg-green":
      activeButtonIndex.value === null || activeButtonIndex.value === index,
  });
});
</script>
<style scoped>
.maximum-scroll {
  max-height: 75vh;
  width: 10vw;
}
</style>
