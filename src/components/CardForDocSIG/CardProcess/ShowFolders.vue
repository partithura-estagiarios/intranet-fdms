<template>
  <div class="row">
    <div v-for="(item, index) in foldersList" class="col-6 col-md-3 q-pa-sm">
      <q-btn
        clickable
        @click="handleItemClick(item)"
        flat
        size="md"
        :label="removeTitleOfFolder(item)"
        :class="getTextClass(item)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFiles } from "../../../stores/files";
const fileStorage = useFiles();
const activeButtonIndex = ref();

const foldersList = ref();
const emits = defineEmits(["zerateArchives"]);

const getTextClass = (name: number) => ({
  "text-green": activeButtonIndex.value === name,
});
const removeTitleOfFolder = (word: string) => {
  return word.replace(fileStorage.getFolder, "");
};
const handleItemClick = (name: string) => {
  activeButtonIndex.value = name;
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
      return (activeButtonIndex.value = "");
    }
    return;
  }
  activeButtonIndex.value = "";
  return (foldersList.value = []);
});
</script>
