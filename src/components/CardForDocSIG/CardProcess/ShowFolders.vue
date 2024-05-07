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
          @click="emits('selectFile', props.buttonIndex, item.folderNow)"
        >
          {{ item.folderNow }}</q-item
        >
      </q-virtual-scroll>
      <q-btn
        icon="arrow_circle_left"
        flat
        @click="emits('selectFile', props.buttonIndex, folders[0].folderParent)"
      ></q-btn>
    </div>
  </q-card-section>
</template>

<script setup lang="ts">
import { Folder } from "../../../entities/files";

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
const showFolder = (item: Folder) => {
  return item.folderNow !== "";
};
</script>

<style scoped></style>
