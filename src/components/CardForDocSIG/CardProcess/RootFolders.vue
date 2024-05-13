<template>
  <q-card-section>
    <q-virtual-scroll
      class="maximum-scroll"
      :items="folderTreeList"
      v-slot="{ item, index }"
    >
      <q-item
        v-if="showFolder(item.folderNow)"
        clickable
        v-ripple
        @click="handleItemClick(index, item.folderNow)"
        :class="folderClass(index)"
      >
        <q-item-section :class="textClass(index)">{{
          item.folderNow
        }}</q-item-section>
      </q-item>
    </q-virtual-scroll>
  </q-card-section>
</template>

<script setup lang="ts">
import LoadFiles from "../../../graphql/folders/LoadFiles.gql";
import { Files } from "../../../modules/graphql/graphql";
import { useFiles } from "../../../stores/files";
import { showFolder } from "./lib";
const fileStorage = useFiles();

const props = defineProps({
  folderTree: {
    type: String,
    required: true,
  },
});
const folderTreeList = ref();
const emits = defineEmits(["selectFolderTree"]);
const activeButtonIndex = ref<null | number>(null);
const textClass = computed(() => {
  return (index: number) => ({
    "text-white": activeButtonIndex.value === index,
  });
});

const folderClass = computed(() => {
  return (index: number) => ({
    "bg-green": activeButtonIndex.value === index,
  });
});

const handleItemClick = (index: number, name: string) => {
  activeButtonIndex.value = index;
  fileStorage.toggleFolderState(name);
  fileStorage.toggleFolderChildState("");
  emits("selectFolderTree", name);
};

watchEffect(async () => {
  if (fileStorage.getReloadState && fileStorage.getFolderTree) {
    const { loadFiles }: { loadFiles: Files } = await runQuery(LoadFiles, {
      folder: fileStorage.getFolderTree,
    });
    folderTreeList.value = loadFiles.folders;
    return fileStorage.toggleReloadState();
  }
  if (props.folderTree) {
    const { loadFiles }: { loadFiles: Files } = await runQuery(LoadFiles, {
      folder: props.folderTree,
    });
    return (folderTreeList.value = loadFiles.folders);
  }
});
onBeforeUpdate(() => {
  activeButtonIndex.value = null;
});
</script>

<style scoped>
.maximum-scroll {
  max-height: 75vh;
  width: 10vw;
}
</style>
