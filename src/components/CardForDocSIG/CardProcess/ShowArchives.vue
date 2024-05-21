<template>
  <div class="row">
    <div v-for="item in archivesList.pdfs" class="col-6 col-md-3">
      <q-btn
        v-if="item"
        icon="picture_as_pdf"
        size="xl"
        clickable
        @click="fileStorage.displayPdf(`${archivesList.path}/${item}`)"
        :class="itemLabel(item).firstPart"
        flat
        stack
      >
        <div class="text-subtitle1 text-bold">
          {{ itemLabel(item).firstPart }}
        </div>
        <div class="font-title-pdf">
          {{ getFileNameWithoutExtension(itemLabel(item).restOfString) }}
        </div>
      </q-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFiles } from "../../../stores/files";
import { getFileNameWithoutExtension, separateMarOfPdf } from "./lib";
import { Files } from "../../../modules/graphql/graphql";
const label = reactive({
  firstPart: "",
  restOfString: "",
});
const fileStorage = useFiles();
const emits = defineEmits(["update"]);
function itemLabel(fileName: string) {
  return separateMarOfPdf(fileName);
}
const archivesList = ref<Files>({ pdfs: [], path: "" });
watchEffect(async () => {
  if (
    (fileStorage.getFolderChild || fileStorage.getReloadState) &&
    fileStorage.getFolderChild != ""
  ) {
    if (fileStorage.getReloadState) {
      fileStorage.toggleReloadState();
    }
    archivesList.value = await fileStorage.loadArchives(
      fileStorage.getFolderChild,
    );
    if (!archivesList.value.pdfs) {
      return (archivesList.value.pdfs = []);
    }
    return;
  }
  return (archivesList.value.pdfs = []);
});
</script>
<style scoped>
.font-title-pdf {
  font-size: 1.2vh;
  line-height: 1.4;
}
</style>
