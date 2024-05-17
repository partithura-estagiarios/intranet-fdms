<template>
  <q-card-actions>
    <q-virtual-scroll
      class="q-pa-md q-gutter-sm justify-center maximum-scroll"
      :items="archivesList?.pdfs || []"
      v-slot="{ item, index }"
    >
      <q-btn
        icon="picture_as_pdf"
        size="lg"
        clickable
        @click="fileStorage.displayPdf(archivesList.path + '/' + item)"
        :label="getFileNameWithoutExtension(item)"
        flat
        stack
      />
    </q-virtual-scroll>
  </q-card-actions>
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

<style scoped>
.maximum-scroll {
  max-height: 70vh;
  width: 36.6vw;
}
</style>
