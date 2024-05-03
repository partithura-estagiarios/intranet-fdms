<template>
  <q-card-section>
    <div v-for="folder in folders" :key="folder.id">
      <div class="row" v-if="folder.folderNow !== ''">
        {{ folder.folderNow }} <q-icon name="folder" />
        <q-btn icon="delete" @click="deleteFiles('', folder.folderNow)" />
      </div>
    </div>
    <div v-for="archive in archives" :key="archive.id">
      <q-icon name="picture_as_pdf" />
      {{ archive.name }}
      <q-btn icon="delete" @click="deleteFiles(archive.path, archive.name)" />
    </div>
    <ConfirmExclusion
      :confirm="confirmDialog"
      @close="confirmDialog = false"
      :file="file"
      :filePath="filePath"
    />
  </q-card-section>
</template>

<script setup lang="ts">
import LoadFiles from "../../../graphql/folders/LoadFiles.gql";
import LoadRootFolders from "../../../graphql/folders/LoadRootFolders.gql";
import { useFiles } from "../../../stores/files";
import { Files } from "../../../entities/files";
import { sourceFolders } from "./lib";

const emits = defineEmits(["close"]);
const props = defineProps({
  folder: {
    type: String,
    default: "",
  },
});
const fileStorage = useFiles();
const folders = ref();
const archives = ref();
const confirmDialog = ref();
const file = ref();
const filePath = ref();
async function loadFiles(folder: string) {
  try {
    const { loadFiles }: { loadFiles: Files } = await runQuery(LoadFiles, {
      folder: folder,
    });
    archives.value = loadFiles.archives;
    folders.value = loadFiles.folders;
  } catch (error) {
    console.error("Error loading files:", error);
  }
}
async function deleteFiles(path: string, name: string) {
  file.value = name;
  filePath.value = path;
  const result = await fileStorage.deleteFile(path, name, false);
  if (result) {
    return window.location.reload();
  }
  return (confirmDialog.value = true);
}

async function loadFolderSource() {
  const { loadRootFolders }: { loadRootFolders: Array<object> } =
    await runQuery(LoadRootFolders);
  const newFolders = loadRootFolders.map((item: any) => ({
    ...item,
    folderNow: item.name,
  }));
  folders.value = [...newFolders];
}

watchEffect(() => {
  if (props.folder === sourceFolders) {
    return loadFolderSource();
  }
  return loadFiles(props.folder);
});
</script>
