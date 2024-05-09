<template>
  <q-card-actions>
    <div
      class="q-pa-md q-gutter-sm justify-center"
      v-for="item in archivesList"
    >
      <q-icon
        name="picture_as_pdf"
        size="xl"
        clickable
        @click="fileStorage.displayPdf(item.path + '/' + item.name)"
        class="cursor-pointer mb-2"
      />
      <div class="text-subtitle1">{{ item.name }}</div>
    </div>
  </q-card-actions>
</template>

<script setup lang="ts">
import { Files } from "../../../entities/files";
import LoadFiles from "../../../graphql/folders/LoadFiles.gql";
import { useFiles } from "../../../stores/files";
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
  if (fileStorage.getReloadState && fileStorage.getFolderChild) {
    const { loadFiles }: { loadFiles: Files } = await runQuery(LoadFiles, {
      folder: fileStorage.getFolderChild,
    });
    archivesList.value = loadFiles.archives;
    fileStorage.toggleReloadState();
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
