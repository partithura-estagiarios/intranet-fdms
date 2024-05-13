<template>
  <q-card-section>
    <div v-if="isChild === 'folderChild'">
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
    <div v-if="isChild && isChild !== 'folderChild'">
      <q-input :label="$t('action.writeFolder')" v-model="input" />
    </div>
  </q-card-section>

  <q-card-actions align="right">
    <q-btn :label="$t('action.confirm')" @click="addFile(fileParent, input)" />
  </q-card-actions>
</template>

<script setup lang="ts">
import { useFiles } from "../../../stores/files";
import IsFolderChild from "../../../graphql/folders/IsFolderChild.gql";
import { FolderTree } from "../../../entities/files";
import { Anexo } from "../../../entities/files";

const emits = defineEmits(["close", "update"]);
const props = defineProps({
  folder: {
    type: Object as () => FolderTree,
    default: "",
  },
});
const nomeAnexo = ref();
const { t } = useI18n();
const isChild = ref();
const input = ref();
const fileStorage = useFiles();
const fileParent = ref();
async function verifyFolder() {
  const { isFolderChild }: { isFolderChild: boolean } = await runQuery(
    IsFolderChild,
    { folder: props.folder },
  );
  return (isChild.value = isFolderChild);
}

async function addFile(folder: string, file: Anexo) {
  const result = await fileStorage.insertFile(folder, file, nomeAnexo.value);
  if (result) {
    emits("update");
    return fileStorage.toggleReloadState();
  }
  return negativeNotify(t("action.folderAlreadyExists"));
}
watchEffect(async () => {
  if (props.folder) {
    fileParent.value = props.folder;
    await verifyFolder();
  }
});
</script>
