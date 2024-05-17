<template>
  <q-card-section>
    <q-virtual-scroll
      class="maximum-scroll"
      :items="folderTreeList"
      v-slot="{ item, index }"
    >
      <q-item
        clickable
        v-ripple
        @click="handleItemClick(index, item)"
        :class="folderClass(index)"
        class="text-h6 text-uppercase"
      >
        <q-item-section :class="textClass(index)">{{ item }}</q-item-section>
      </q-item>
    </q-virtual-scroll>
  </q-card-section>
</template>

<script setup lang="ts">
import { useFiles } from "../../../stores/files";
const fileStorage = useFiles();
const folderTreeList = ref();
const activeButtonIndex = ref<null | number>(null);
const textClass = computed(() => {
  return (index: number) => ({
    "text-white": activeButtonIndex.value === index,
  });
});

const folderClass = computed(() => {
  return (index: number) => ({
    "bg-green": activeButtonIndex.value === index,
  });
});

const handleItemClick = async (index: number, name: string) => {
  activeButtonIndex.value = index;
  fileStorage.toggleFolderState(name);
};

watch(
  [() => fileStorage.getReloadState, () => fileStorage.getFolderTree],
  async ([newReloadState, newFolderTree]) => {
    if (newFolderTree) {
      folderTreeList.value = await fileStorage.loadFolders(newFolderTree);
      activeButtonIndex.value = folderTreeList.value.length ? 0 : null;
      fileStorage.toggleFolderState(folderTreeList.value[0]);
      return;
    }
    if (newFolderTree && newReloadState) {
      fileStorage.toggleReloadState();
      return (folderTreeList.value =
        await fileStorage.loadFolders(newFolderTree));
    }
  },
  { immediate: true },
);
</script>

<style scoped>
.maximum-scroll {
  max-height: 75vh;
  width: 10vw;
}
</style>
