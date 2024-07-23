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
      <q-btn
        icon="more_vert"
        flat
        size="lg"
        class="absolute-right"
        v-if="userStorage.getToken"
      >
        <q-menu anchor="top right" self="top left" class="text-black">
          <q-list>
            <q-item clickable v-close-popup>
              <q-item-section @click="openModal(isFolder)">{{
                $t("action.addFolder")
              }}</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section @click="openModal(isFile)">{{
                $t("action.addFile")
              }}</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section @click="openModal(isDeletion)"
                >{{ $t("action.deleteItem") }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
      <q-dialog v-model="openDialog">
        <q-card>
          <DialogHeader @close="(val) => (openDialog = val)" :option="title" />
          <BuildPath :active-dialog="openDialog" :option="title" />
        </q-card>
      </q-dialog>
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
