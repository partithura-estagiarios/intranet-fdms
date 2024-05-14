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

const handleItemClick = async (index: number, name: string) => {
  activeButtonIndex.value = index;
  fileStorage.toggleFolderState(name);
  fileStorage.toggleFolderChildState("");
  await fileStorage.toggleReloadArchives();
  emits("selectFolderTree", name);
};

watchEffect(async () => {
  if (fileStorage.getReloadState && fileStorage.getFolderTree) {
    fileStorage.toggleReloadState();
    return (folderTreeList.value = await fileStorage.loadFolders(
      fileStorage.getFolderTree,
    ));
  }
  if (props.folderTree) {
    return (folderTreeList.value = await fileStorage.loadFolders(
      fileStorage.getFolderTree,
    ));
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
