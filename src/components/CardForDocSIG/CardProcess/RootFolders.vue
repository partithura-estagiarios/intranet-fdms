<template>
  <q-card-section>
    <div class="height-limited scroll">
      <q-item
        class="q-my-md"
        clickable
        v-ripple
        v-for="(folder, index) in foldersList"
        :key="index"
        :class="tabClass(folder)"
      >
        <q-item-section
          @click="
            fileStorage.setNameFolderP(folder), (activeButtonIndex = folder)
          "
          >{{ folder }}</q-item-section
        >
      </q-item>
    </div>
  </q-card-section>
</template>

<script setup lang="ts">
import { useFiles } from "../../../stores/files";
const fileStorage = useFiles();
const foldersList = ref();
const activeButtonIndex = ref("");
function tabClass(item: string) {
  return {
    "text-white bg-green rounded-borders": activeButtonIndex.value === item,
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
  }
});
</script>

<style scoped>
.height-limited {
  max-height: 40rem;
  width: 15rem;
}
</style>
