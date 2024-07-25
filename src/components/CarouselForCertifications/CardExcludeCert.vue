<template>
  <q-dialog v-model="props.card">
    <q-card class="my-card">
      <DialogHeader
        @close="closeDialog"
        :option="$t('action.deleteCertification')"
      />

      <q-card-section>
        <q-select
          v-model="select"
          :label="$t('text.file')"
          :options="imgsStorage.certifications"
          class="text-black"
          ><template #option="{ opt }" class="size-select-custom">
            <div class="size-select">
              <q-item class="text-black" clickable>
                <q-item-section v-close-popup>
                  <q-item-label @click="select = opt">{{ opt }}</q-item-label>
                </q-item-section>
              </q-item>
            </div>
          </template></q-select
        >
      </q-card-section>
      <CardButtonConfirm @confirm="excludeCert()" />
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useImgs } from "../../stores/imgs";

const imgsStorage = useImgs();
const emits = defineEmits(["update-card"]);
const props = defineProps({
  card: {
    type: Boolean,
    required: true,
  },
});
const select = ref();
function closeDialog() {
  emits("update-card", false);
}
function excludeCert() {
  imgsStorage.excludeCertification(select.value);
  closeDialog();
}
</script>
