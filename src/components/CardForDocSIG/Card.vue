<template>
  <div class="fixed-center q-mt-xl q-pa-xl">
    <q-card class="card">
      <q-card-section class="custom-color text-h6 row text-white">
        <div class="col-12">
          <Tab :tabItems="tabItems" />
        </div>
      </q-card-section>
      <CardProcess />
    </q-card>
  </div>
</template>

<script setup lang="ts">
import LoadFolders from "../../graphql/folders/LoadFolders.gql";
const tabItems = ref();
onMounted(async () => {
  const { loadFolders }: { loadFolders: String[] } =
    await runQuery(LoadFolders);
  tabItems.value = loadFolders;
});
</script>
<style scoped>
.card {
  width: 50vw;
  padding: 0;
  margin: 0;
  height: 90vh;
}
.custom-color {
  background-color: rgb(31, 73, 125);
}
</style>
