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
        :class="getFolderClass(index)"
        class="text-h7 text-uppercase"
      >
        <q-item-section :class="getTextClass(index)">{{ item }}</q-item-section>
      </q-item>
    </q-virtual-scroll>
  </q-card-section>
</template>

<script setup lang="ts">
import { useFiles } from "../../../stores/files";
const fileStorage = useFiles();
const folderTreeList = ref();
const activeButtonIndex = ref<null | number>(null);
const getTextClass = (index: number) => ({
  "text-white": activeButtonIndex.value === index,
});

const getFolderClass = (index: number) => ({
  "bg-green": activeButtonIndex.value === index,
});

const handleItemClick = async (index: number, name: string) => {
  activeButtonIndex.value = index;
  fileStorage.toggleFolderState(name);
};

watchEffect(async () => {
  if (fileStorage.getReloadState || fileStorage.getFolderTree) {
    if (fileStorage.getReloadState) {
      fileStorage.toggleReloadState();
    }

    if (fileStorage.getFolderTree && !fileStorage.getFolder) {
      activeButtonIndex.value = null;
    }
    folderTreeList.value = await fileStorage.loadFolders(
      fileStorage.getFolderTree,
    );
    if (!folderTreeList.value.includes(fileStorage.getFolder)) {
      return (activeButtonIndex.value = null);
    }
  }
});
</script>

<style scoped>
.maximum-scroll {
  max-height: 75vh;
  width: 10vw;
}
</style>
