<template>
  <div class="fixed-center">
    <q-card>
      <q-card-section class="bg-indigo-8 text-h6 row text-white">
        <div class="col-12">
          <Tab @showCard="updateSelectCard" />
        </div>
      </q-card-section>
      <q-card-section horizontal>
        <q-card-section class="row no-padding">
          <div class="q-pa-md">
            <List :tabSelect="selectCard" @showImage="updateSelectImg" />
          </div>
        </q-card-section>
        <q-card class="q-pa-md box-shadow">
          <q-img :src="selectImg" width="1000px" />
        </q-card>
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup lang="ts">
const selectCard = ref("");
const selectImg = ref("");

const updateSelectCard = (item: string) => {
  selectCard.value = item;
};
const updateSelectImg = (item: string) => {
  selectImg.value = "/pi_p.png";
};
</script>
<style scoped>
.box-shadow {
  box-shadow: 0.5px 4px 9px rgba(0, 0, 0, 0.1);
}
</style>
