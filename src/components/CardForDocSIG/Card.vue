<template>
  <div class="fixed-center relative-position card">
    <q-card>
      <q-card-section
        class="bg-indigo-8 text-h6 row text-white max-height-card-sectio"
      >
        <div class="col-12">
          <Tab @showCard="updateSelectCard" :tabItems="tabItems" />
        </div>
      </q-card-section>
      <CardProcess :folderParent="selectCard" />
    </q-card>
  </div>
</template>

<script setup lang="ts">
import LoadRootFolders from "../../graphql/folders/LoadRootFolders.gql";
import { FolderTree } from "../../entities/files";
const selectCard = ref("");
const updateSelectCard = (item: string) => {
  selectCard.value = item;
};
const tabItems = ref();
onMounted(async () => {
  const { loadRootFolders }: { loadRootFolders: Array<FolderTree> } =
    await runQuery(LoadRootFolders);
  tabItems.value = loadRootFolders;
});
</script>

<style scoped>
.box-shadow {
  box-shadow: 0.5px 4px 9px rgba(0, 0, 0, 0.1);
}
.card {
  padding-top: 4%;
  height: 100vh;
  width: 50vw;
}
.position-options {
  left: 32vw;
  bottom: 5vh;
}
.max-height-card-sectio {
  max-height: 8vh;
}
</style>
