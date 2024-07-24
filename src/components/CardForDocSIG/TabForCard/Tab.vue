<template>
  <div>
    <q-tabs class="font-custom" v-model="tab">
      <q-btn
        v-for="(item, index) in folderList"
        :key="index"
        no-caps
        flat
        size="lg"
        :label="item.name"
        :class="coloringItem(item.name)"
        @click="handleTabClick(item.name)"
      />
    </q-tabs>
  </div>
</template>

<script setup lang="ts">
import { useFiles } from "../../../stores/files";
import { isDeletion, isFile, isFolder } from "./lib";
import { AuxFolder } from "../../../entities/files";
import BuildPath from "./BuildPath.vue";
const userStorage = useUsers();

const fileStorage = useFiles();
const tab = ref("");
const openDialog = ref(false);
const title = ref("");
const folderList = ref();
function handleTabClick(folderName: string) {
  tab.value = folderName;
  fileStorage.setNameFolderGP(folderName);
}
function coloringItem(itemName: string) {
  return {
    "text-green bg-white rounded-borders": itemName === tab.value,
  };
}
function openModal(text: string) {
  openDialog.value = true;
  title.value = text;
}
watchEffect(() => {
  folderList.value = fileStorage.getFoldersGrandParent;
  if (folderList.value) {
    const isIndexInFoldersList = folderList.value.includes(tab.value);
    if (isIndexInFoldersList) {
      tab.value = "";
    }
  }
});
watch(
  () => folderList.value,
  (newList: AuxFolder[]) => {
    if (tab.value && !newList.map((item) => item.name).includes(tab.value)) {
      tab.value = "";
    }
  },
);
</script>

<style scoped>
.font-custom {
  font-family: Fira Sans;
  height: 3rem;
}
</style>
