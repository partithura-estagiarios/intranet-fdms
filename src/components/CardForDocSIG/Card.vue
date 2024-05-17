<template>
  <div class="fixed-center relative-position card">
    <q-card>
      <q-card-section
        class="bg-indigo-8 text-h6 row text-white max-height-card-sectio"
      >
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
