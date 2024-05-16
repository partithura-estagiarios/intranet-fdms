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
          @click="emits('confirmExclusion'), (enableConfirm = false)"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import ItsFileFolder from "../../../graphql/folders/ItsFileFolder.gql";
const props = defineProps({
  confirm: {
    type: Boolean,
    required: false,
  },
  item: {
    type: String,
    default: "",
  },
});
const { t } = useI18n();
const title = ref();
async function setTitle(folderName: string) {
  const { itsFileFolder }: { itsFileFolder: boolean } = await runQuery(
    ItsFileFolder,
    {
      folder: folderName,
    },
  );
  if (itsFileFolder || props.item.includes(".")) {
    return (title.value = t("action.deleteSureFile"));
  }
  return (title.value = t("action.stillFiles"));
}

const enableConfirm = ref();
const emits = defineEmits(["close", "confirmExclusion"]);
watchEffect(() => {
  enableConfirm.value = props.confirm;
  setTitle(props.item);
});
</script>
