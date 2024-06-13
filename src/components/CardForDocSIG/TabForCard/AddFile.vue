<template>
  <div>
    <q-file
      v-model="input"
      :label="$t('cardDocSig.attachments')"
      accept=".pdf"
      flat
    >
      <template v-slot:before>
        <q-icon name="attach_file" />
      </template>
    </q-file>
    <q-input stack-label v-model="mar" label="MAR" type="number" />
    <q-input stack-label v-model="nameFile" :label="$t('folders.fileName')" />
    <q-card-actions align="right" class="text-green">
      <q-btn
        flat
        :label="$t('action.confirm')"
        v-close-popup
        @click="addFile()"
        :disabled="isButtonDisabled"
        ><q-tooltip v-if="isButtonDisabled" class="text-h7">
          {{ $t("action.fillAll") }}</q-tooltip
        >
      </q-btn>
    </q-card-actions>
  </div>
</template>

<script setup lang="ts">
import { useFiles } from "../../../stores/files";
import { StatusResponse } from "../../../support/contracts";
const { t } = useI18n();
const fileStorage = useFiles();
const props = defineProps({
  path: {
    type: String,
    required: true,
  },
});
async function addFile() {
  const fileName = `MAR${mar.value} ${nameFile.value}`;
  const result = await fileStorage.insertFile(
    fileName,
    props.path,
    input.value,
  );
  if (result.includes(StatusResponse.SUCCESS)) {
    return positiveNotify(t("action.fileSuccess"));
  }
  if (result.includes(StatusResponse.REPEAT)) {
    return negativeNotify(t("action.repeatFile"));
  }
  negativeNotify(t("action.errorCreatingFile"));
}

const isButtonDisabled = computed(() => {
  return !input.value || !mar.value || !nameFile.value;
});
const mar = ref();
const nameFile = ref();
const input = ref();
</script>
