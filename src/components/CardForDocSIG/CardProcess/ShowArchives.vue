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
import { useFiles } from "../../../stores/files";
import { getFileNameWithoutExtension } from "./lib";
import { Files } from "../../../modules/graphql/graphql";

const fileStorage = useFiles();
const emits = defineEmits(["update"]);

const archivesList = ref<Files>({ pdfs: [], path: "" });
watchEffect(async () => {
  if (
    (fileStorage.getFolderChild || fileStorage.getReloadState) &&
    fileStorage.getFolderChild != ""
  ) {
    if (fileStorage.getReloadState) {
      fileStorage.toggleReloadState();
    }
    archivesList.value = await fileStorage.loadArchives(
      fileStorage.getFolderChild,
    );
    if (!archivesList.value.pdfs) {
      return (archivesList.value.pdfs = []);
    }
    return;
  }
  return (archivesList.value.pdfs = []);
});
</script>
