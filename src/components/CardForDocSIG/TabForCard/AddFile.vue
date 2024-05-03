<template>
  <q-card-section>
    <q-select v-model="typeFile" :options="selectOptions" />
  </q-card-section>
  <q-card-section>
    <q-file
      v-if="typeFile === 'PDF' && !isSourceFolder"
      v-model="input"
      :label="$t('action.addFile')"
      rounded
      outlined
      accept=".pdf"
    >
      <template v-slot:append>
        <q-icon name="archive" color="white" />
      </template>
    </q-file>

    <q-input
      :label="$t('action.writeFolder')"
      v-model="input"
      v-if="typeFile === $t('text.folder')"
    />
  </q-card-section>

  <q-card-actions align="right">
    <q-btn
      :label="$t('action.confirm')"
      @click="addFile(props.folder, input)"
    />
  </q-card-actions>
</template>

<script setup lang="ts">
import { useFiles } from "../../../stores/files";
import { sourceFolders } from "./lib";
const emits = defineEmits(["close"]);
const props = defineProps({
  folder: {
    type: String,
    default: "",
  },
});
const { t } = useI18n();

const typeFile = ref("");
const input = ref();
const fileStorage = useFiles();
const isSourceFolder = computed(() => {
  return props.folder === sourceFolders;
});

const selectOptions = computed(() => {
  if (isSourceFolder.value) {
    return [t("text.folder")];
  }
  return [t("text.folder"), "PDF"];
});

async function addFile(folder: string, file: string) {
  const result = await fileStorage.insertFile(folder, file);
  if (result) {
    return window.location.reload();
  }
  return negativeNotify(t("action.folderAlreadyExists"));
}
</script>
