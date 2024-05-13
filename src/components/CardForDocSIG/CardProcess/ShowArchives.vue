<template>
  <q-card-actions>
    <q-virtual-scroll
      class="q-pa-md q-gutter-sm justify-center maximum-scroll"
      :items="archivesList"
      v-slot="{ item, index }"
    >
      <q-icon
        name="picture_as_pdf"
        size="xl"
        clickable
        @click="fileStorage.displayPdf(item.path + '/' + item.name)"
        class="cursor-pointer mb-2"
      />
      <div class="text-subtitle1">
        {{ getFileNameWithoutExtension(item.name) }}
      </div>
    </q-virtual-scroll>
  </q-card-actions>
</template>

<script setup lang="ts">
import { Files } from "../../../entities/files";
import LoadFiles from "../../../graphql/folders/LoadFiles.gql";
import { useFiles } from "../../../stores/files";
import { getFileNameWithoutExtension } from "./lib";
const fileStorage = useFiles();
const emits = defineEmits(["update"]);
const props = defineProps({
  childFolder: {
    type: String,
    required: false,
  },
});
const archivesList = ref();
watchEffect(async () => {
  if (!fileStorage.getFolderChild) {
    return (archivesList.value = []);
  }
  if (fileStorage.getReloadState && fileStorage.getFolderChild) {
    const { loadFiles }: { loadFiles: Files } = await runQuery(LoadFiles, {
      folder: fileStorage.getFolderChild,
    });
    archivesList.value = loadFiles.archives;

    return fileStorage.toggleReloadState();
  }
  if (props.childFolder) {
    const { loadFiles }: { loadFiles: Files } = await runQuery(LoadFiles, {
      folder: props.childFolder,
    });
    return (archivesList.value = loadFiles.archives);
  }
  archivesList.value = [];
});
</script>
<style scoped>
.maximum-scroll {
  max-height: 70vh;
  width: 36.6vw;
}
</style>
