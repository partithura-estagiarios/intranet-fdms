<template>
  <q-card-actions>
    <q-virtual-scroll
      class="q-pa-md q-gutter-sm justify-center maximum-scroll"
      :items="archivesList.pdfs"
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
  if (fileStorage.getReloadArchives && !fileStorage.getFolderChild) {
    archivesList.value = [];
    await fileStorage.toggleReloadArchives();
    return;
  }
  if (fileStorage.getReloadState && fileStorage.getFolderChild) {
    fileStorage.toggleReloadState();
    archivesList.value = await fileStorage.loadArchives(
      fileStorage.getFolderChild,
    );
    return;
  }
  if (props.childFolder) {
    archivesList.value = await fileStorage.loadArchives(
      fileStorage.getFolderChild,
    );
    return;
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
