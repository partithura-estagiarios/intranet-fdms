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
            (val1, val2, val3) => {
              nameCert = val1;
              numberCert = val2;
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
}
</script>
