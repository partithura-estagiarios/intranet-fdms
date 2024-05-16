<template>
  <q-card-section>
    <q-input
      v-model="modelFolder"
      :label="$t('action.selectTheFolder')"
      @click="(dialog = true), loadFolders()"
      readonly
    >
      <q-dialog v-model="dialog">
        <DialogFolders :foldersList="options" @selectFolder="getFolder" />
      </q-dialog>
    </q-input>
  </q-card-section>
  <AddFile
    :folder="modelFolder"
    v-if="props.version == 'add'"
    @update="loadFolders"
  />
  <DeleteFile
    :folder="modelFolder"
    v-if="props.version == 'delete'"
    @update="loadFolders"
  />
</template>

<script setup lang="ts">
import LoadAllFolders from "../../../graphql/folders/LoadAllFolders.gql";
import { useFiles } from "../../../stores/files";
const fileStorage = useFiles();
const props = defineProps({
  version: {
    type: String,
    default: "",
  },
});
const dialog = ref();
const options = ref();
function getFolder(val: string) {
  dialog.value = false;
  modelFolder.value = val;
}
const modelFolder = ref();
const reloadFolders = ref(false);
async function loadFolders() {
  reloadFolders.value = true;
  const { loadAllFolders }: { loadAllFolders: string[] } =
    await runQuery(LoadAllFolders);
  options.value = loadAllFolders;
  reloadFolders.value = false;
}
watchEffect(async () => {
  if (fileStorage.reload) {
    loadFolders();
  }
});
loadFolders();
</script>
