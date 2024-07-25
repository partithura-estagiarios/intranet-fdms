<template>
  <q-dialog v-model="props.card">
    <q-card class="my-card">
      <DialogHeader
        @close="closeDialog"
        :option="$t('tab.addCertifications')"
      />

      <q-card-section
        ><InputsForCertification
          @envity-all-inputs="
            (val1: number, val2: string, val3: File) => {
              numberCert = val1;
              nameCert = val2;
              img = val3;
            }
          "
        />
      </q-card-section>
      <CardButtonConfirm @confirm="addFolder()" />
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { addCertifcation } from "./lib";

const emits = defineEmits(["update-card-folder"]);
const nameCert = ref();
const numberCert = ref();
const img = ref();

const props = defineProps({
  card: {
    type: Boolean,
    required: true,
  },
});
function closeDialog() {
  emits("update-card-folder", false);
}
async function addFolder() {
  await addCertifcation(nameCert.value, numberCert.value, img.value);
  closeDialog();
}
</script>
