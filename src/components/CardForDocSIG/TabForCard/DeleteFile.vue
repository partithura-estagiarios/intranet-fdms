<template>
  <q-card-section>
    <div v-for="folder in folders" :key="folder.id">
      <div class="row" v-if="folder.folderNow !== ''">
        {{ folder.folderNow }} <q-icon name="folder" />
        <q-btn
          icon="delete"
          @click="enableDeletionModal('', folder.folderNow)"
        />
      </div>
    </div>
    <div v-for="archive in archives" :key="archive.id">
      <q-icon name="picture_as_pdf" />
      {{ archive.name }}
      <q-btn
        icon="delete"
        @click="enableDeletionModal(archive.path, archive.name)"
      />
    </div>
    <ConfirmExclusion
      :confirm="confirmDialog"
      @close="confirmDialog = false"
      :file="file"
      :filePath="filePath"
      @confirmExclusion="(confirmDialog = false), updateFiles()"
    />
  </q-card-section>
</template>

<script setup lang="ts">
import LoadFiles from "../../../graphql/folders/LoadFiles.gql";
import LoadRootFolders from "../../../graphql/folders/LoadRootFolders.gql";
import { Files } from "../../../entities/files";
import { sourceFolders } from "./lib";

const emits = defineEmits(["close"]);
const props = defineProps({
  folder: {
    type: String,
    default: "",
  },
});
const folders = ref();
const archives = ref();
const confirmDialog = ref();
const file = ref();
const filePath = ref();
async function loadFiles(folder: string) {
  const { loadFiles }: { loadFiles: Files } = await runQuery(LoadFiles, {
    folder: folder,
  });
  archives.value = loadFiles.archives;
  folders.value = loadFiles.folders;
}

async function loadFolderSource() {
  const { loadRootFolders }: { loadRootFolders: Array<object> } =
    await runQuery(LoadRootFolders);
  const newFolders = loadRootFolders.map((item: any) => ({
    ...item,
    folderNow: item.name,
  }));
  folders.value = [...newFolders];
  archives.value = [];
}

function enableDeletionModal(path: string, fileSelect: string) {
  file.value = fileSelect;
  filePath.value = path;
  confirmDialog.value = true;
}

async function updateFiles() {
  if (props.folder === sourceFolders) {
    return await loadFolderSource();
  }
  if (props.folder !== sourceFolders) {
    return await loadFiles(props.folder);
  }
}

watchEffect(async () => {
  await updateFiles();
});
</script>
