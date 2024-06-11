<template>
  <div>
    <q-card-actions align="right" class="text-green">
      <q-btn
        flat
        :label="$t('action.confirm')"
        v-close-popup
        @click="deleteItem()"
        :disable="!isPathValid"
      />
    </q-card-actions>
  </div>
</template>

<script setup lang="ts">
import { useFiles } from "../../../stores/files";
import { useI18n } from "vue-i18n";
import { success, firsPosition } from "./lib";
const fileStorage = useFiles();
const { t } = useI18n();
const props = defineProps({
  path: {
    type: String,
    required: true,
  },
});

async function deleteItem() {
  const result = await fileStorage.excludeFolder(props.path);
  if (result.includes(success)) {
    return positiveNotify(t(`action.${result}`));
  }
  return negativeNotify(t(`action.${result}`));
}

const isPathValid = computed(() => {
  const arr = props.path.split("/");
  if (arr[firsPosition]) {
    return true;
  }
  return false;
});
</script>
