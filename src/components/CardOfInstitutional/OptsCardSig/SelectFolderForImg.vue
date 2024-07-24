<template>
  <q-select
    v-model="model"
    :label="$t('text.folder')"
    :options="imgsStorage.folders"
  >
    <template #option="{ opt }" class="size-select-custom">
      <div class="size-select">
        <q-item class="text-black" clickable>
          <q-item-section v-close-popup>
            <q-item-label @click="handleSelect(opt)">{{ opt }}</q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </template>
  </q-select>
</template>

<script setup lang="ts">
import { useImgs } from "../../../stores/imgs";

const emits = defineEmits(["envity-folder"]);
const imgsStorage = useImgs();
const model = ref();

function handleSelect(opt: string) {
  model.value = opt;
  emits("envity-folder", opt);
}
</script>

<style scoped>
.size-select {
  max-height: 2rem;
}
</style>
