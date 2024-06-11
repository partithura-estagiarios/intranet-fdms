<template>
  <q-input v-model="input" stack-label :label="$t('action.writeFolder')" />
  <q-card-actions align="right" class="text-green">
    <q-btn
      flat
      :label="$t('action.confirm')"
      v-close-popup
      @click="addFolder()"
    />
  </q-card-actions>
</template>

<script setup lang="ts">
import { useFiles } from "../../../stores/files";
const fileStorage = useFiles();
const { t } = useI18n();

const props = defineProps({
  path: {
    type: String,
    required: true,
  },
});
const input = ref();
const success = "Success";
async function addFolder() {
  const result = await fileStorage.insertFolder(props.path, input.value);
  if (result.includes(success)) {
    return positiveNotify(t(`action.${result}`));
  }
  return negativeNotify(t(`action.${result}`));
}
</script>
