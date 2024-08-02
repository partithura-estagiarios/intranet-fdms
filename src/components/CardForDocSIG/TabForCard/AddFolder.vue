<template>
  <q-input v-model="input" stack-label :label="$t('action.writeFolder')" />
  <q-card-actions align="right" class="text-green">
    <q-btn
      flat
      :label="$t('action.confirm')"
      v-close-popup
      @click="addFolder()"
      class="font-custom"
    />
  </q-card-actions>
</template>

<script setup lang="ts">
import { useFiles } from "../../../stores/files";
import { StatusResponse } from "../../../support/contracts";
const fileStorage = useFiles();
const { t } = useI18n();

const props = defineProps({
  path: {
    type: String,
    required: true,
  },
});
const input = ref();
async function addFolder() {
  if (props.path) {
    const result = await fileStorage.insertFolder(props.path, input.value);
    if (result.includes(StatusResponse.SUCCESS)) {
      return positiveNotify(t("action.createFolderSuccess"));
    }
    if (result.includes(StatusResponse.REPEAT)) {
      return negativeNotify(t("action.folderAlreadyExists"));
    }
    return negativeNotify(t("action.errorCreatingFolder"));
  }
  negativeNotify(t("folders.insertNameFolder"));
}
</script>
<style scoped>
.font-custom {
  font-family: Fira Sans;
  height: 3rem;
}
</style>
