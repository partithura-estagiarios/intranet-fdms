<template>
  <q-card-section>
    <q-virtual-scroll
      class="maximum-scroll"
      :items="folderTreeList"
      v-slot="{ item, index }"
    >
      <q-item
        clickable
        v-ripple
        @click="handleItemClick(index, item)"
        :class="folderClass(index)"
      >
        <q-item-section :class="textClass(index)">{{ item }}</q-item-section>
      </q-item>
    </q-virtual-scroll>
  </q-card-section>
</template>

<script setup lang="ts">
import { useFiles } from "../../../stores/files";
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
      props.folderTree,
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
