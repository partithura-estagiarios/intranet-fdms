<template>
  <q-card>
    <q-card-section>
      <q-btn
        :label="$t('action.selectTheFolder')"
        @click="
          () => {
            fixed = true;
            loadFolders();
          }
        " />

      {{ modelFolder }}
      <q-dialog v-model="fixed">
        <q-card>
          <q-separator />

          <q-card-section>
            <Folders
              :folders="options"
              @close="
                (folder) => {
                  modelFolder = folder;
                  fixed = false;
                }
              "
            />
          </q-card-section>

          <q-separator />

          <q-card-actions align="right">
            <q-btn
              flat
              :label="$t('action.confirm')"
              color="primary"
              v-close-popup
            />
          </q-card-actions>
        </q-card> </q-dialog
    ></q-card-section>
    <AddFile
      :folder="modelFolder"
      v-if="props.version == 'add'"
      @close="fixed = false"
    />
    <DeleteFile :folder="modelFolder" v-if="props.version == 'delete'" />
  </q-card>
</template>

<script setup lang="ts">
import LoadFolders from "../../../graphql/folders/LoadFolders.gql";
import Folders from "./Folders.vue";

const { t } = useI18n();
const props = defineProps({
  version: {
    type: String,
    default: "",
  },
});
const options = ref();
const modelFolder = ref();
const fixed = ref();

async function loadFolders() {
  const { loadFolders }: { loadFolders: Array<string> } =
    await runQuery(LoadFolders);
  options.value = loadFolders;
  options.value.push(t("text.sourceFolders"));
}
</script>
