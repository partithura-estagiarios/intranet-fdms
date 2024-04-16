<template>
  <q-list v-for="item in past" class="text-indigo-8">
    <q-item
      clickable
      :class="{ 'text-white bg-green rounded-borders': link === item }"
      @click="setLink(item)"
    >
      <q-item-section>
        {{ item }}
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup lang="ts">
import { useFiles } from "../../../stores/files";
const emits = defineEmits(["showImage"]);

const filesStorage = useFiles();
const props = defineProps({
  tabSelect: {
    type: String,
    required: true,
  },
});
const link = ref<string | null>(null);
const past = ref<string[]>([]);

async function loadArchives() {
  const files = await filesStorage.fetchFileList();
  const filesList: string[] = [];
  const foldersList: string[] = [];
  files.forEach((item: string) => {
    if (item.includes("png")) {
      return filesList.push(item);
    }
    foldersList.push(item);
  });
  past.value = foldersList;
}
function setLink(item: string) {
  link.value = item;
  emits("showImage", link.value);
}
watchEffect(async () => {
  if (props.tabSelect) {
    loadArchives();
  }
});
</script>
