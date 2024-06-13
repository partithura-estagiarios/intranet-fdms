<template>
  <q-card-section>
    <div class="row">
      <q-item clickable v-ripple v-for="folder in foldersList" class="text-h7">
        <q-item-section @click="setFolder(folder)" :class="tabClass(folder)">{{
          folder
        }}</q-item-section>
      </q-item>
    </div>
  </q-card-section>
</template>

<script setup lang="ts">
import { useFiles } from "../../../stores/files";

const fileStorage = useFiles();
const foldersList: Ref<String[]> = ref([]);
const tab: Ref<String> = ref("");

function tabClass(itemName: String) {
  return {
    "text-green bg-white rounded-borders": itemName === tab.value,
  };
}

watchEffect(() => {
  if (fileStorage.nameOfParent && Array.isArray(fileStorage.getFoldersChild)) {
    const isIndexInFoldersList = foldersList.value.includes(tab.value);
    if (!isIndexInFoldersList) {
      tab.value = "";
    }
    return (foldersList.value = fileStorage.getFoldersChild);
  }
  return (foldersList.value = []);
});
function setFolder(folder: String) {
  fileStorage.setNameFolderC(folder);
  tab.value = folder;
}
</script>
