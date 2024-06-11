<template>
  <div>
    <q-tabs class="font-custom" v-model="tab">
      <q-btn
        v-for="(item, index) in folderList"
        :key="index"
        no-caps
        flat
        size="lg"
        :name="item"
        :label="item.name"
        :class="tabClass(item.name)"
        @click="handleTabClick(item.name)"
      />
      <q-btn icon="edit" flat class="absolute-right">
        <q-menu anchor="top right" self="top left">
          <q-list>
            <q-item clickable v-close-popup>
              <q-item-section
                @click="(openDialog = true), (option = isFolder)"
                >{{ $t("action.folder") }}</q-item-section
              >
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section @click="(openDialog = true), (option = isFile)">{{
                $t("action.file")
              }}</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section
                @click="(openDialog = true), (option = isDeletion)"
                >{{ $t("action.delete") }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
      <q-dialog v-model="openDialog">
        <q-card>
          <DialogHeader @close="(val) => (openDialog = val)" :option="option" />
          <BuildPath :active-dialog="openDialog" :option="option" />
        </q-card>
      </q-dialog>
    </q-tabs>
  </div>
</template>

<script setup lang="ts">
import { useFiles } from "../../../stores/files";
import { isDeletion, isFile, isFolder, styleTabs } from "./lib";
import BuildPath from "./BuildPath.vue";
const fileStorage = useFiles();
const tab = ref("");
const openDialog = ref(false);
const option = ref("");
const folderList = ref();
function handleTabClick(folderName: string) {
  tab.value = folderName;
  fileStorage.setNameFolderGP(folderName);
}
function tabClass(itemName: string) {
  return {
    [styleTabs]: itemName === tab.value,
  };
}
watchEffect(() => {
  folderList.value = fileStorage.getFoldersGrandParent;
});
</script>

<style scoped>
.font-custom {
  font-family: Fira Sans;
  height: 3rem;
}
</style>
