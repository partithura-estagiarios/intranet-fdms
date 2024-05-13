<template>
  <q-card>
    <q-card-section>
      <q-select
        class="size-area"
        v-model="modelFolder"
        :options="options"
        :label="$t('action.selectTheFolder')"
        :loading="reloadFolders"
      />
    </q-card-section>

    <AddFile
      :folder="modelFolder"
      v-if="props.version == 'add'"
      @update="loadFolders"
    />
    <DeleteFile
      :folder="modelFolder"
      v-if="props.version == 'delete'"
      @update="loadFolders"
    />
  </q-card>
</template>

<script setup lang="ts">
import LoadFolders from "../../../graphql/folders/LoadFolders.gql";
import { Folder } from "../../../modules/graphql/graphql";
import { useFiles } from "../../../stores/files";
const fileStorage = useFiles();
const props = defineProps({
  version: {
    type: String,
    default: "",
  },
});
const options = ref();
const modelFolder = ref();
const reloadFolders = ref(false);
async function loadFolders() {
  reloadFolders.value = true;
  const { loadFolders }: { loadFolders: Folder[] } =
    await runQuery(LoadFolders);
  options.value = loadFolders.map((folder) => folder.name);
  reloadFolders.value = false;
}
watchEffect(async () => {
  if (fileStorage.reload) {
    loadFolders();
  }
});
loadFolders();
</script>
