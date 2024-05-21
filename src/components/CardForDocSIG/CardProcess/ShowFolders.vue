<template>
  <div class="row">
    <div v-for="(item, index) in foldersList" class="col-6 col-md-3 q-pa-sm">
      <q-btn
        clickable
        @click="handleItemClick(index, item)"
        flat
        size="md"
        :label="removeTitleOfFolder(item)"
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
const emits = defineEmits(["zerateArchives"]);

const getTextClass = (index: number) => ({
  "text-green": activeButtonIndex.value === index,
});
const removeTitleOfFolder = (word: string) => {
  return word.replace(fileStorage.getFolder, "");
};
const handleItemClick = (index: number, name: string) => {
  activeButtonIndex.value = index;
  fileStorage.toggleFolderChildState(name);
};
watchEffect(async () => {
  if (fileStorage.getFolder || fileStorage.getReloadState) {
    if (fileStorage.getReloadState) {
      fileStorage.toggleReloadState();
    }
    foldersList.value = await fileStorage.loadFolders(fileStorage.getFolder);
    if (!foldersList.value.includes(fileStorage.getFolderChild)) {
      fileStorage.toggleFolderChildState("");
      return (activeButtonIndex.value = null);
    }
    return;
  }
  activeButtonIndex.value = null;
  return (foldersList.value = []);
});
</script>
