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
      @confirmExclusion="(confirmDialog = false), loadFiles(props.folder.name)"
    />
  </q-card-section>
</template>

<script setup lang="ts">
import LoadFiles from "../../../graphql/folders/LoadFiles.gql";
import { Files } from "../../../entities/files";
import { useFiles } from "../../../stores/files";
import { FolderTree } from "../../../entities/files";

const fileStorage = useFiles();
const emits = defineEmits(["close"]);
const props = defineProps({
  folder: {
    type: Object as () => FolderTree,
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

function enableDeletionModal(path: string, fileSelect: string) {
  file.value = fileSelect;
  filePath.value = path;
  confirmDialog.value = true;
}

watchEffect(async () => {
  if (props.folder.name) {
    await loadFiles(props.folder.name);
  }
});
</script>
