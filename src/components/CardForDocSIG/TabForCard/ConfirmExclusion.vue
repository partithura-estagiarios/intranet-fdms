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
          @click="emits('close')"
        />
        <q-btn
          flat
          :label="$t('action.confirm')"
          color="indigo-8"
          @click="emits('confirmExclusion'), (enableConfirm = false)"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import ExistsFilesOrFolders from "../../../graphql/folders/ExistsFilesOrFolders.gql";
const props = defineProps({
  confirm: {
    type: Boolean,
    required: false,
  },
  fileOrFolder: {
    type: String,
    default: "",
  },
});
const { t } = useI18n();
const title = ref();
async function setTitle(folderName: string) {
  const { existsFilesOrFolders }: { existsFilesOrFolders: boolean } =
    await runQuery(ExistsFilesOrFolders, {
      folder: folderName,
    });
  if (!existsFilesOrFolders) {
    return (title.value = t("action.deleteSureFile"));
  }
  return (title.value = t("action.stillFiles"));
}

const enableConfirm = ref();
const emits = defineEmits(["close", "confirmExclusion"]);
watchEffect(() => {
  enableConfirm.value = props.confirm;
  if (props.fileOrFolder) {
    setTitle(props.fileOrFolder);
  }
});
</script>
