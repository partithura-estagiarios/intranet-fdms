<template>
  <q-dialog v-model="enableConfirm" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="rule_folder" color="indigo" text-color="white" />
        <span class="q-ml-sm">{{ title }}</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          :label="$t('action.cancel.index')"
          color="indigo-8"
          @click="enableConfirm = false"
        />
        <q-btn
          flat
          :label="$t('action.confirm')"
          color="indigo-8"
          @click="confirmDelete"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { Opts } from "../../../entities/files";
import { useFiles } from "../../../stores/files";
import LoadFiles from "../../../graphql/folders/LoadFiles.gql";
import { isEmpty } from "./lib";
import { Files } from "../../../modules/graphql/graphql";
const { t } = useI18n();
const fileStorage = useFiles();
const props = defineProps({
  confirm: {
    type: Boolean,
    required: true,
  },
  file: {
    type: Object as () => Opts,
    default: "",
  },
});
const enableConfirm = ref();
const emits = defineEmits(["close", "confirmExclusion"]);
const title = ref("");

async function confirmDelete() {
  await fileStorage.deleteFile(props.file.path, props.file.name);
  fileStorage.toggleReloadState();
  enableConfirm.value = false;
  emits("confirmExclusion");
}
async function setTitle(folderName: string) {
  const { loadFiles }: { loadFiles: Files } = await runQuery(LoadFiles, {
    folder: folderName,
  });
  if (isEmpty(loadFiles)) {
    return (title.value = t("action.deleteSureFile"));
  }
  return (title.value = t("action.stillFiles"));
}

watchEffect(async () => {
  if (props.confirm) {
    enableConfirm.value = props.confirm;
    if (props.file.name.includes(".")) {
      return (title.value = t("action.deleteSureFile"));
    }
    await setTitle(props.file.name);
  }
});
</script>
