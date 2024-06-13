<template>
  <div class="fixed-center q-mt-xl q-pa-xl">
    <q-card class="card no-padding no-margin">
      <q-card-section class="custom-color text-h6 row text-white">
        <div class="col-12">
          <Tab />
        </div>
      </q-card-section>
      <CardProcess />
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { GrandParentFolder } from "../../entities/files";
import GetAllFolders from "../../graphql/folders/GetAllFolders.gql";
import { useFiles } from "../../stores/files";
const fileStorage = useFiles();
onMounted(async () => {
  const { getAllFolders }: { getAllFolders: GrandParentFolder[] } =
    await runQuery(GetAllFolders);
  fileStorage.setAllFolders(getAllFolders);
});
watchEffect(async () => {
  if (fileStorage.getFoldersAgain) {
    const { getAllFolders }: { getAllFolders: GrandParentFolder[] } =
      await runQuery(GetAllFolders);
    fileStorage.setAllFolders(getAllFolders);
    fileStorage.getFoldersAgain = false;
  }
});
</script>

<style scoped>
.card {
  width: 70rem;
  height: 50rem;
}
.custom-color {
  background-color: rgb(31, 73, 125);
}
</style>
