<template>
  <div class="row relative-position">
    <q-file
      v-model="files"
      @update:model-value="sendFile(files)"
      :label="$t('text.addArchive')"
      label-color="white"
      rounded
      outlined
      class="size"
    >
      <template v-slot:append>
        <q-icon name="archive" color="white" /> </template
    ></q-file>
    <q-input
      v-model="nameArchive"
      label-color="white"
      :label="$t('text.searchArchive')"
      rounded
      outlined
      @update:model-value="returnSearchArchives()"
      class="size"
    >
      <template v-slot:append> <q-icon name="search" color="white" /> </template
    ></q-input>
  </div>
</template>

<script setup lang="ts">
import { useFiles } from "../../stores/files";
const emits = defineEmits(["showCard", "searchFiles"]);
const nameArchive = ref();
const files = ref();
const filesStorage = useFiles();
function sendFile(newFiles: any) {
  filesStorage.sendFileToServer(newFiles);
  files.value = null;
  emits("showCard", "attFiles");
}
async function returnSearchArchives() {
  const { files } = await filesStorage.searchFile(nameArchive.value);
  emits("searchFiles", files);
}
</script>
<style scoped>
.size {
  width: 19vh;
}
</style>
