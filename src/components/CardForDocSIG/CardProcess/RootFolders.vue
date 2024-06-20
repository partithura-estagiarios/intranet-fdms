<template>
  <q-card-section>
    <div class="height-limited scroll">
      <q-item
        class="bg-white rounded-borders q-my-md coloring-text"
        clickable
        v-ripple
        v-for="(folder, index) in foldersList"
        :key="index"
        :class="coloringItem(folder)"
      >
        <q-item-section @click="setFolder(folder)">{{ folder }}</q-item-section>
      </q-item>
    </div>
  </q-card-section>
</template>

<script setup lang="ts">
import { useFiles } from "../../../stores/files";
const fileStorage = useFiles();
const foldersList = ref();
const activeButtonIndex = ref("");
function coloringItem(item: string) {
  return {
    "text-white bg-green rounded-borders q-my-md":
      activeButtonIndex.value === item,
  };
}
watchEffect(() => {
  if (fileStorage.nameOfGrandParent) {
    foldersList.value = fileStorage.getFoldersParent;
    if (foldersList.value) {
      const isIndexInFoldersList = foldersList.value.includes(
        activeButtonIndex.value,
      );
      if (!isIndexInFoldersList) {
        activeButtonIndex.value = "";
      }
    }
    return;
  }
  foldersList.value = [];
});
function setFolder(folder: string) {
  fileStorage.setNameFolderP(folder);
  activeButtonIndex.value = folder;
}
watch(
  () => fileStorage.nameOfGrandParent,
  (newValue, oldValue) => {
    if (newValue != oldValue) {
      activeButtonIndex.value = "";
    }
  },
);
</script>

<style scoped>
.height-limited {
  max-height: 40rem;
  width: 15rem;
}
.coloring-text {
  color: black;
}
</style>
