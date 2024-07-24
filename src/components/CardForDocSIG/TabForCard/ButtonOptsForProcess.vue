<template>
  <q-icon
    name="more_vert"
    class="cursor-pointer"
    color="white"
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
  </q-icon>
  <q-dialog v-model="openDialog">
    <q-card>
      <DialogHeader @close="(val) => (openDialog = val)" :option="title" />
      <BuildPath :active-dialog="openDialog" :option="title" />
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useUsers } from "../../../stores/user";
import { isDeletion, isFile, isFolder } from "./lib";

const userStorage = useUsers();
const title = ref("");
const openDialog = ref(false);
function openModal(text: string) {
  openDialog.value = true;
  title.value = text;
}
</script>
