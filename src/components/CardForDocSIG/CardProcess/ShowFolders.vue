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
import { useFiles } from "../../../stores/files";
import { showFolder } from "./lib";
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
    fileStorage.toggleReloadState();
    return (foldersList.value = await fileStorage.loadFolders(
      fileStorage.getFolder,
    ));
  }
  if (props.selectTreeFolder) {
    return (foldersList.value = await fileStorage.loadFolders(
      fileStorage.getFolder,
    ));
  }
  return (foldersList.value = []);
});
onBeforeUpdate(() => {
  activeButtonIndex.value = null;
});
</script>
<style scoped>
.maximum-scroll {
  height: 10vh;
  width: 35vw;
}
</style>
