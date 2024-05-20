<template>
  <q-card>
    <q-card-section horizontal>
      <div class="q-pt-xl">
        <RootFolders />
      </div>
      <div>
        <ShowFolders />
        <ShowArchives />
      </div>
    </q-card-section>
  </q-card>
</template>
<script setup lang="ts">
const reloadArchives = ref();
</script>
