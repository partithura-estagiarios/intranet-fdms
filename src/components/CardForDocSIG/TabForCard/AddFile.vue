<template>
  <q-card-section>
    <div v-if="isChild">
      <q-file
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
    </div>
    <div v-else>
      <q-input :label="$t('action.writeFolder')" v-model="input" />
    </div>
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
import IsFolderChild from "../../../graphql/folders/IsFolderChild.gql";
const emits = defineEmits(["close"]);
const props = defineProps({
  folder: {
    type: String,
    default: "",
  },
});
const { t } = useI18n();
const isChild = ref();
const typeFile = ref("");
const input = ref();
const fileStorage = useFiles();

async function verifyFolder() {
  const { isFolderChild }: { isFolderChild: boolean } = await runQuery(
    IsFolderChild,
    { folder: props.folder },
  );
  console.log(isFolderChild);
  return (isChild.value = isFolderChild);
}

async function addFile(folder: string, file: string) {
  const result = await fileStorage.insertFile(folder, file);
  if (result) {
    return fileStorage.updateValues(props.folder);
  }
  return negativeNotify(t("action.folderAlreadyExists"));
}
watchEffect(async () => {
  await verifyFolder();
});
</script>
