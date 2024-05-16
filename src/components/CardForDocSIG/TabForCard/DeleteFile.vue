<template>
  <q-card-section>
    <q-select :options="options" v-model="item" />
  </q-card-section>
  <ConfirmExclusion
    :fileOrFolder="item"
    :confirm="enableConfirm"
    @confirm-exclusion="exclude"
  />
  <q-card-actions align="right">
    <q-btn
      :label="$t('action.confirm')"
      text-color="green"
      flat
      :disable="!item"
      @click="enableConfirm = true"
    />
  </q-card-actions>
</template>

<script setup lang="ts">
import ItsFileFolder from "../../../graphql/folders/ItsFileFolder.gql";
import { useFiles } from "../../../stores/files";
const fileStorage = useFiles();
const emits = defineEmits(["close", "update"]);
const props = defineProps({
  folder: {
    type: String,
    required: false,
  },
});

const options = ref();
const enableConfirm = ref();
const item = ref();
const resultPdfs = ref();
const folderReload = ref();
async function loadPdsOrFolders(folder: string) {
  const { itsFileFolder }: { itsFileFolder: boolean } = await runQuery(
    ItsFileFolder,
    { folder: folder },
  );
  if (itsFileFolder) {
    resultPdfs.value = options.value = await fileStorage.loadArchives(folder);
    return (options.value = resultPdfs.value.pdfs);
  }
  return (options.value = await fileStorage.loadFolders(folder));
}
async function exclude() {
  if (item.value.includes(".")) {
    return await fileStorage.excludeFile(
      resultPdfs.value.path + "/" + item.value,
    );
  }
  return fileStorage.excludeFolder(item.value);
}
watchEffect(async () => {
  if (props.folder) {
    folderReload.value = props.folder;
    item.value = null;
    loadPdsOrFolders(props.folder);
  }
});
</script>
