<template>
  <q-card-section>
    <div class="row">
      <q-virtual-scroll
        v-slot="{ item, index }"
        :items="validFolders"
        virtual-scroll-horizontal
      >
        <q-item
          clickable
          @click="handleItemClick(index)"
          :class="folderClass(index)"
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
import { computed } from "vue";

const activeButtonIndex = ref<null | number>(null);

const props = defineProps({
  folders: {
    type: Array<Folder>,
    required: true,
  },
  buttonIndex: {
    type: Number,
    required: false,
  },
});
const emits = defineEmits(["selectFile"]);

const validFolders = computed(() =>
  props.folders.filter((folder) => folder.folderNow !== ""),
);

const textClass = computed(() => {
  return (index: number) => ({
    "text-white": activeButtonIndex.value === index,
  });
});

const handleItemClick = (index: number) => {
  activeButtonIndex.value = index;
  emits("selectFile", index, validFolders.value[index].folderNow);
};

const folderClass = computed(() => {
  return (index: number) => ({
    "bg-green": activeButtonIndex.value === index,
  });
});
</script>
