<template>
  <q-card-actions>
    <div class="q-pa-md q-gutter-sm justify-center" v-for="item in archives">
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
</template>

<script setup lang="ts">
import { Archive } from "../../../entities/files";

import { useFiles } from "../../../stores/files";
const fileStorage = useFiles();

const props = defineProps({
  archives: {
    type: Array<Archive>,
    required: false,
  },
});
</script>

<style scoped></style>
