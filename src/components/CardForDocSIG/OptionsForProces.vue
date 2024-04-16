<template>
  <div class="row relative-position">
    <q-file
      v-model="files"
      :label="$t('text.addArchive')"
      label-color="white"
      rounded
      outlined
      class="size"
    >
      <template v-slot:append>
        <q-icon name="archive" color="white" />
      </template>
    </q-file>
    <q-input
      v-model="nameArchive"
      label-color="white"
      :label="$t('text.searchArchive')"
      rounded
      outlined
      class="size"
    >
      <template v-slot:append>
        <q-icon name="search" color="white" />
      </template>
    </q-input>
    <q-btn
      rounded
      outlined
      color="indigo-8"
      text-color="white"
      :label="$t('action.createFolder')"
      @click="openDirectoryPicker"
      icon="folder_copy"
    />
  </div>
</template>

<script setup lang="ts">
import { useFiles } from "../../stores/files";
const emits = defineEmits(["showCard", "searchFiles"]);
const nameArchive = ref("");
const files = ref();
const filesStorage = useFiles();
async function openDirectoryPicker() {
  await window.showDirectoryPicker();
}
</script>

<style scoped>
.size {
  width: 19vh;
}
</style>
