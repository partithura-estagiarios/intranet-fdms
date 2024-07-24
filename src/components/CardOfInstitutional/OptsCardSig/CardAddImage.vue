<template>
  <q-dialog v-model="props.card">
    <q-card class="my-card">
      <DialogHeader @close="closeDialog" :option="$t('cardDocSig.addImg')" />
      <q-card-section>
        <SelectFolderForImg @envity-folder="(val) => (folder = val)" />
      </q-card-section>
      <q-card-section>
        <InputImg @envity-img="(val) => (img = val)" />
      </q-card-section>
      <CardButtonConfirm @confirm="addImg()" />
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useImgs } from "../../../stores/imgs";

const imgsStorage = useImgs();
const props = defineProps({
  card: {
    type: Boolean,
    required: true,
  },
});

const folder = ref();
const img = ref();
const emits = defineEmits(["update-card"]);

function closeDialog() {
  emits("update-card", false);
}

function addImg() {
  imgsStorage.insertImg(folder.value, img.value);
}
</script>
