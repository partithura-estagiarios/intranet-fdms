<template>
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
import { Folder } from "../../../entities/files";
import { useFiles } from "../../../stores/files";
const fileStorage = useFiles();
const activeButtonIndex = ref<null | number>(null);

const props = defineProps({
  folders: {
    type: Array<Folder>,
    required: true,
  },
  buttonIndex: {
    type: Number || null,
    required: false,
  },
});
const emits = defineEmits(["selectFile", "update"]);
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
  emits("selectFile", name);
};
onBeforeUpdate(() => {
  activeButtonIndex.value = null;
});
</script>
