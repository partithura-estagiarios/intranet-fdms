<template>
  <q-card class="my-card" flat bordered>
    <q-card-section horizontal>
      <div class="q-pt-xl">
        <RootFolders
          :folderTree="folderTree"
          @selectFolderTree="loadFoldersAndFiles"
        />
      </div>
      <div>
        <ShowFolders
          :folders="folders"
          @selectFile="loadFilesAll"
          @update="loadFilesAll"
        />
        <q-separator />

        <ShowArchives :archives="archives" @update="loadFoldersAndFiles" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import LoadFiles from "../../../graphql/folders/LoadFiles.gql";
import { Files } from "../../../entities/files";
import { useFiles } from "../../../stores/files";
const fileStorage = useFiles();
const props = defineProps({
  folderParent: {
    type: String,
    required: false,
  },
});
const folderTree = ref();

const archives = ref();
const folders = ref();

const folderSourcesSide = async (folderName: string) => {
  const { loadFiles }: { loadFiles: Files } = await runQuery(LoadFiles, {
    folder: folderName,
  });
  folders.value = [];
  archives.value = [];
  return (folderTree.value = loadFiles.folders);
};
const loadFoldersAndFiles = async (folderName: string) => {
  const { loadFiles }: { loadFiles: Files } = await runQuery(LoadFiles, {
    folder: folderName,
  });
  folders.value = loadFiles.folders;
  archives.value = loadFiles.archives;
};
const loadFilesAll = async (folderName: string) => {
  const { loadFiles }: { loadFiles: Files } = await runQuery(LoadFiles, {
    folder: folderName,
  });
  archives.value = loadFiles.archives;
};
watchEffect(async () => {
  if (props.folderParent) {
    return await folderSourcesSide(props.folderParent);
  }
});
</script>
