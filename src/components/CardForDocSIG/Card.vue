<template>
  <div class="fixed-center relative-position card">
    <q-card>
      <q-card-section class="bg-indigo-8 text-h6 row text-white">
        <div class="col-12">
          <Tab @showCard="updateSelectCard" />
        </div>
      </q-card-section>
      <q-card-section horizontal>
        <q-card-section class="row no-padding">
          <div class="q-pa-md">
            <List
              :tabSelect="selectCard"
              @showImage="(title) => (selectTitle = title)"
              @envityImgs="(imgsForCard) => (imgs = imgsForCard)"
            />
          </div>
        </q-card-section>
        <q-card class="q-pa-md box-shadow">
          <q-img :src="selecImage" width="1000px" />
        </q-card>
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup lang="ts">
import { extractImage } from "./lib";
const selectCard = ref("");
const selectTitle = ref("");
const imgs = ref();
const selecImage = ref();
const updateSelectCard = (item: string) => {
  selectCard.value = item;
};
watchEffect(() => {
  if (selectTitle.value) {
    updateImg(selectTitle.value);
  }
});
function updateImg(title: String) {
  selecImage.value = extractImage(title as string, imgs.value);
}
</script>
<style scoped>
.box-shadow {
  box-shadow: 0.5px 4px 9px rgba(0, 0, 0, 0.1);
}
.card {
  padding-top: 5%;
}
</style>
