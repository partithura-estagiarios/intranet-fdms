<template>
  <q-card class="my-card" flat bordered>
    <q-card-section horizontal>
      <RootFolders
        :folderTree="folderTree"
        @select-folder-tree="
          (indexSelect, folderSelect) => changeFolder(indexSelect, folderSelect)
        "
      />
      <div>
        <ShowFolders
          :folders="folders"
          :button-index="activeButtonIndex"
          @select-file="
            (indexSelect, folderSelect) =>
              changeFolder(indexSelect, folderSelect)
          "
        />
        <q-separator />

        <ShowArchives :archives="archives" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import InsertFolders from "../../../graphql/folders/InsertFolders.gql";
import LoadRootFolders from "../../../graphql/folders/LoadRootFolders.gql";
import LoadFiles from "../../../graphql/folders/LoadFiles.gql";
import { Files } from "../../../entities/files";
import { useFiles } from "../../../stores/files";
import { sourceFolders } from "../TabForCard/lib";
const folderTree = ref();
const activeButtonIndex = ref();
const archives = ref();
const folders = ref();
const fileStorage = useFiles();

onMounted(() => {
  loadFolderSource();
});
const changeFolder = async (index: number, folderName: string) => {
  activeButtonIndex.value = index;
  const { loadFiles }: { loadFiles: Files } = await runQuery(LoadFiles, {
    folder: folderName,
  });
  if (loadFiles == null) {
    archives.value = [];
    return (folders.value = []);
  }
  archives.value = loadFiles.archives;
  return (folders.value = loadFiles.folders);
};
async function loadFolderSource() {
  await runMutation(InsertFolders, {});
  const { loadRootFolders }: { loadRootFolders: Array<object> } =
    await runQuery(LoadRootFolders);
  folderTree.value = loadRootFolders;
}

watchEffect(async () => {
  if (fileStorage.update && fileStorage.updateFolder === sourceFolders) {
    await Promise.all([
      loadFolderSource(),
      changeFolder(activeButtonIndex.value, fileStorage.updateFolder),
    ])
      .then(() => {
        fileStorage.update = false;
      })
      .catch((error) => {
        console.error("Erro ao executar promessas:", error);
      });
    return;
  }
  if (fileStorage.update) {
    await Promise.all([
      changeFolder(activeButtonIndex.value, fileStorage.updateFolder),
    ])
      .then(() => {
        fileStorage.update = false;
      })
      .catch((error) => {
        console.error("Erro ao executar promessas:", error);
      });
  }
});
</script>
