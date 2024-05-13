<template>
  <q-card-section>
    <q-select
      :options="options"
      v-model="file"
      :disable="enableSelect"
      :label="selectLabel"
    />
  </q-card-section>
  <ConfirmExclusion
    :file="file"
    :confirm="enableConfirm"
    @confirmExclusion="handleConfirmExclusion"
  />
  <q-card-actions align="right">
    <q-btn
      :label="$t('action.confirm')"
      text-color="green"
      flat
      :disable="!file"
      @click="enableConfirm = true"
    />
  </q-card-actions>
</template>

<script setup lang="ts">
import LoadFiles from "../../../graphql/folders/LoadFiles.gql";
import { Files, Folder, Opts } from "../../../entities/files";
const { t } = useI18n();

const emits = defineEmits(["close", "update"]);
const props = defineProps({
  folder: {
    type: String,
    required: false,
  },
});

const options: Opts[] = reactive([]);
const enableConfirm = ref();
const file = ref();
const folderReload = ref();
async function loadFiles(folder: string) {
  options.length = 0;
  const { loadFiles }: { loadFiles: Files } = await runQuery(LoadFiles, {
    folder: folder,
  });
  if (loadFiles.archives.length !== 0) {
    options.splice(
      0,
      options.length,
      ...loadFiles.archives.map((archive: any) => ({
        label: archive.name,
        value: archive.path,
        path: archive.path,
        name: archive.name,
      })),
    );
    return;
  }
  loadFiles.folders.forEach(({ folderParent, folderNow }: Folder) => {
    const folderObject: Opts = {
      label: folderNow,
      value: folderNow,
      path: folderParent,
      name: folderNow,
    };
    options.push(folderObject);
  });
}
async function handleConfirmExclusion() {
  await loadFiles(folderReload.value);
  enableConfirm.value = false;
  file.value = null;
  emits("update");
}
watchEffect(async () => {
  if (props.folder) {
    folderReload.value = props.folder;
    file.value = null;
    await loadFiles(props.folder);
  }
});
const enableSelect = computed(() => {
  return options.length > 0 && options[0].name === "";
});

const selectLabel = computed(() => {
  return enableSelect.value ? t("cardDocSig.emptyFolder") : "";
});
</script>
