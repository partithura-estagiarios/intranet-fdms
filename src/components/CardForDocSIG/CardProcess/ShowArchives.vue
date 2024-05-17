<template>
  <div class="row">
    <div v-for="item in archivesList.pdfs" class="col-6 col-md-3">
      <q-btn
        icon="picture_as_pdf"
        size="xl"
        clickable
        @click="fileStorage.displayPdf(`${archivesList.path}/${item}`)"
        :label="getFileNameWithoutExtension(item)"
        flat
        stack
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useFiles } from "../../../stores/files";
import { getFileNameWithoutExtension } from "./lib";
import { Files } from "../../../modules/graphql/graphql";

const fileStorage = useFiles();
const emits = defineEmits(["update"]);

const archivesList = ref<Files>({ pdfs: [], path: "" });

watch(
  [
    () => fileStorage.getFolderChild,
    () => fileStorage.getReloadState,
    () => fileStorage.getFolder,
  ],
  async ([newFolderChild, newReloadState]) => {
    if (newFolderChild) {
      return (archivesList.value =
        await fileStorage.loadArchives(newFolderChild));
    }
    if (newReloadState && newFolderChild) {
      fileStorage.toggleReloadState();
      return (archivesList.value =
        await fileStorage.loadArchives(newFolderChild));
    }
    return (archivesList.value.pdfs = []);
  },
  { immediate: true },
);
</script>
