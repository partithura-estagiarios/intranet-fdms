<template>
  <q-card>
    <q-card-section horizontal>
      <div class="q-pt-xl">
        <RootFolders />
      </div>
      <q-separator vertical inset class="bg-grey size" />

      <div>
        <ShowFolders />
        <q-separator inset class="bg-grey" />

        <ShowArchives />
      </div>
    </q-card-section>
  </q-card>
</template>
<script setup lang="ts">
const fileStorage = useFiles();

onMounted(() => {
  fileStorage.resetSelectedFiedls();
});
</script>
<style scoped>
.size {
  height: 43.5rem;
}
</style>
