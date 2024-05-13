<template>
  <q-card-section>
    <div class="row">
      <q-virtual-scroll
        class="maximum-scroll"
        v-slot="{ item, index }"
        :items="foldersList"
        virtual-scroll-horizontal
      >
        <q-item
          v-if="showFolder(item)"
          clickable
          @click="handleItemClick(index, item.folderNow)"
        >
          <q-item-section :class="textClass(index)">{{
            item.folderNow
          }}</q-item-section>
        </q-item>
      </q-virtual-scroll>
    </div>
  </q-card-section>
</template>

<script setup lang="ts">
import { Files, Folder } from "../../../entities/files";
import LoadFiles from "../../../graphql/folders/LoadFiles.gql";
import { useFiles } from "../../../stores/files";
const fileStorage = useFiles();
const activeButtonIndex = ref<null | number>(null);
const props = defineProps({
  selectTreeFolder: {
    type: String,
    required: false,
  },
});
const foldersList = ref();
const emits = defineEmits(["selectFolderChild"]);
const showFolder = (item: Folder) => {
  return item.folderNow !== "";
};

const textClass = computed(() => {
  return (index: number) => ({
    "text-green": activeButtonIndex.value === index,
  });
});

const handleItemClick = (index: number, name: string) => {
  activeButtonIndex.value = index;
  fileStorage.toggleFolderChildState(name);
  emits("selectFolderChild", name);
};
watchEffect(async () => {
  if (fileStorage.getReloadState && fileStorage.getFolder) {
    const { loadFiles }: { loadFiles: Files } = await runQuery(LoadFiles, {
      folder: fileStorage.getFolderTree,
    });
    foldersList.value = loadFiles.folders;
    fileStorage.toggleReloadState();
  }
  if (props.selectTreeFolder) {
    const { loadFiles }: { loadFiles: Files } = await runQuery(LoadFiles, {
      folder: props.selectTreeFolder,
    });
    return (foldersList.value = loadFiles.folders);
  }
  foldersList.value = [];
});
</script>
<style scoped>
.maximum-scroll {
  height: 10vh;
  width: 35vw;
}
</style>
