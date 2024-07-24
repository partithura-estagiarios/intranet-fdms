<template>
  <q-dialog v-model="props.card">
    <q-card class="my-card">
      <DialogHeader @close="closeDialog" :option="$t('action.addFolder')" />

      <q-card-section
        ><q-input v-model="nameFolder" :label="$t('action.writeFolder')" />
      </q-card-section>
      <q-card-section> </q-card-section>
      <CardButtonConfirm @confirm="addFolder()" />
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useImgs } from "../../../../stores/imgs";

const imgsStorage = useImgs();
const emits = defineEmits(["update-card-folder"]);
const nameFolder = ref();
function closeDialog() {
  emits("update-card-folder", false);
}
const props = defineProps({
  card: {
    type: Boolean,
    required: true,
  },
});
function addFolder() {
  imgsStorage.insertFolder(nameFolder.value);
}
</script>
