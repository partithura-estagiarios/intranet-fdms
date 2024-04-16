<template>
  <div class="fixed-center relative-position card">
    <q-card>
      <q-card-section
        class="bg-indigo-8 text-h6 row text-white max-height-card-sectio"
      >
        <div class="col-12">
          <Tab @showCard="updateSelectCard" />
          <OptionsForProces
            class="position-options col"
            @show-card="(item) => (selectCard = item)"
            @search-files="(item) => (selectHyperText = item)"
          />
        </div>
      </q-card-section>
      <q-card-section horizontal>
        <q-card-section class="row no-padding">
          <div class="q-pa-md">
            <List :tabSelect="selectCard" />
          </div>
        </q-card-section>
        <q-card class="q-pa-md box-shadow">
          <CardProcess :files="selectHyperText" />
        </q-card>
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup lang="ts">
const selectCard = ref("");
const selectTitle = ref("");
const process = ref();
const selectHyperText = ref();
const updateSelectCard = (item: string) => {
  selectCard.value = item;
};
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
