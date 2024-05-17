<template>
  <div class="row">
    <div v-for="(item, index) in foldersList" class="col-6 col-md-2">
      <q-btn
        clickable
        @click="handleItemClick(index, item)"
        flat
        size="xl"
        :label="item"
        :class="getTextClass(index)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFiles } from "../../../stores/files";
const fileStorage = useFiles();
const activeButtonIndex = ref<null | number>(null);

const foldersList = ref();
const emits = defineEmits(["selectFolderChild"]);

const getTextClass = (index: number) => ({
  "text-green": activeButtonIndex.value === index,
});

const handleItemClick = (index: number, name: string) => {
  activeButtonIndex.value = index;
  fileStorage.toggleFolderChildState(name);
};
watch(
  [
    () => fileStorage.getReloadState,
    () => fileStorage.getFolder,
    () => fileStorage.getFolderTree,
  ],
  async ([newReloadState, newFolder, newFolderTree]) => {
    if (newFolder) {
      foldersList.value = await fileStorage.loadFolders(newFolder);
      fileStorage.toggleFolderChildState(foldersList.value[0]);
      activeButtonIndex.value = foldersList.value.length ? 0 : null;
      return;
    }
    if (newFolderTree) {
      return (foldersList.value = []);
    }

    if (newReloadState && newFolder) {
      fileStorage.toggleReloadState();
      return (foldersList.value = await fileStorage.loadFolders(newFolder));
    }
  },
  { immediate: true },
);
</script>
<style scoped>
.maximum-scroll {
  height: 10vh;
  width: 35vw;
}
</style>
