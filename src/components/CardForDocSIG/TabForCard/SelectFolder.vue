<template>
  <q-card-section>
    <q-input
      v-model="modelFolder"
      :label="$t('action.selectTheFolder')"
      @click="dialog = true"
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
import LoadFolders from "../../../graphql/folders/LoadFolders.gql";
import { Folder } from "../../../modules/graphql/graphql";
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
  const { loadFolders }: { loadFolders: Folder[] } =
    await runQuery(LoadFolders);
  options.value = loadFolders.map((folder) => folder.name);
  reloadFolders.value = false;
}
watchEffect(async () => {
  if (fileStorage.reload) {
    loadFolders();
  }
});
loadFolders();
</script>
