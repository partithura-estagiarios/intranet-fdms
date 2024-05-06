<template>
  <q-card class="my-card" flat bordered>
    <q-card-section horizontal>
      <q-card-section>
        <q-virtual-scroll
          class="maximum-scroll"
          :items="folderTree"
          v-slot="{ item, index }"
        >
          <q-item
            clickable
            v-ripple
            @click="changeFolder(index, item.name)"
            v-model="link"
            :class="folderClass(index)"
          >
            <q-item-section :class="textClass(index)">{{
              item.name
            }}</q-item-section>
          </q-item>
        </q-virtual-scroll>
      </q-card-section>

      <div class="">
        <q-card-section>
          <div class="row">
            <q-virtual-scroll
              v-slot="{ item, index }"
              :items="folders"
              virtual-scroll-horizontal
            >
              <q-item
                v-if="showFolder(item)"
                clickable
                @click="changeFolder(activeButtonIndex, item.folderNow)"
              >
                {{ item.folderNow }}</q-item
              >
            </q-virtual-scroll>
            <q-btn
              icon="arrow_circle_left"
              flat
              @click="changeFolder(activeButtonIndex, folders[0].folderParent)"
            ></q-btn>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions>
          <div
            class="q-pa-md q-gutter-sm justify-center"
            v-for="item in archives"
          >
            <q-icon
              name="picture_as_pdf"
              size="xl"
              clickable
              @click="fileStorage.displayPdf(item.path + '/' + item.name)"
              class="cursor-pointer mb-2"
            />
            <div class="text-subtitle1">{{ item.name }}</div>
          </div>
        </q-card-actions>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import InsertFolders from "../../../graphql/folders/InsertFolders.gql";
import LoadRootFolders from "../../../graphql/folders/LoadRootFolders.gql";
import LoadFiles from "../../../graphql/folders/LoadFiles.gql";
import { Files, Folder } from "../../../entities/files";
import { useFiles } from "../../../stores/files";
const folderTree = ref();
const link = ref();
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
const folderClass = computed(() => {
  return (index: number) => ({
    "bg-green":
      activeButtonIndex.value === null || activeButtonIndex.value === index,
  });
});
const textClass = computed(() => {
  return (index: number) => ({
    "text-white": activeButtonIndex.value === index,
  });
});
const showFolder = (item: Folder) => {
  return item.folderNow !== "";
};
watchEffect(async () => {
  if (fileStorage.update) {
    fileStorage.update = false;
    await loadFolderSource();
    await changeFolder(activeButtonIndex.value, fileStorage.updateFolder);
  }
});
</script>
<style scoped>
.maximum-scroll {
  max-height: 75vh;
  width: 10vw;
}
</style>
