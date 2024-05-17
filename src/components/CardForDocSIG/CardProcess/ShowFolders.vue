<template>
  <q-card-section>
    <div class="row">
      <q-btn
        clickable
        v-for="(item, index) in foldersList"
        @click="handleItemClick(index, item)"
        flat
        :label="item"
        :class="textClass(index)"
      />
    </div>
  </q-card-section>
</template>

<script setup lang="ts">
import { useFiles } from "../../../stores/files";
const fileStorage = useFiles();
const activeButtonIndex = ref<null | number>(null);

const foldersList = ref();
const emits = defineEmits(["selectFolderChild"]);

const textClass = computed(() => {
  return (index: number) => ({
    "text-green": activeButtonIndex.value === index,
  });
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
