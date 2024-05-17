<template>
  <q-card-section>
    <div v-if="fileFolder">
      <q-input v-model="nomeAnexo" :label="$t('cardDocSig.writeFileName')" />
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
    </div>
    <div v-else>
      <q-input :label="$t('action.writeFolder')" v-model="input" />
    </div>
  </q-card-section>
  <q-card-actions align="right" class="text-green">
    <div v-if="fileFolder">
      <q-btn
        :label="$t('action.confirm')"
        flat
        @click="addFile(input)"
        :disable="!input"
      />
    </div>
    <div v-else>
      <q-btn
        :label="$t('action.confirm')"
        flat
        @click="addFolder(input)"
        :disable="!input"
      />
    </div>
  </q-card-actions>
</template>

<script setup lang="ts">
import ItsFileFolder from "../../../graphql/folders/ItsFileFolder.gql";
import { useFiles } from "../../../stores/files";
const { t } = useI18n();
const fileStorage = useFiles();
const emits = defineEmits(["close", "update"]);
const props = defineProps({
  folder: {
    type: String,
    default: "",
  },
});
const nomeAnexo = ref();
const input = ref();
const folderParent = ref();
const fileFolder = ref();
async function verifyFolder() {
  const { itsFileFolder }: { itsFileFolder: boolean } = await runQuery(
    ItsFileFolder,
    { folder: props.folder },
  );
  return (fileFolder.value = itsFileFolder);
}
async function addFolder(fileOrFolder: any) {
  const result = await fileStorage.insertFolder(
    folderParent.value,
    fileOrFolder,
  );
  if (!result) {
    return negativeNotify(t("action.folderAlreadyExists"));
  }
}
function addFile(fileOrFolder: any) {
  fileStorage.insertFile(folderParent.value, fileOrFolder, nomeAnexo.value);
}
watchEffect(async () => {
  if (props.folder) {
    folderParent.value = props.folder;
    await verifyFolder();
  }
});
</script>
