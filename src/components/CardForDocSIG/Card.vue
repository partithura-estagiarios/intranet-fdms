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
            v-if="selectCard == 'processes'"
          />
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
          <q-img :src="selecImage" width="1000px" v-show="!selectHyperText" />
          <ul>
            <li v-for="file in selectHyperText" class="row">
              <a href="#" @click="filesStorage.displayImage(file)" class="col">
                {{ file }}
              </a>
              <q-btn icon="delete" @click="deleteFile(file)" />
            </li>
          </ul>
        </q-card>
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup lang="ts">
import { extractImage } from "./lib";
import { useFiles } from "../../stores/files";
const filesStorage = useFiles();
const selectCard = ref("");
const selectTitle = ref("");
const imgs = ref();
const selecImage = ref();
const selectHyperText = ref();
const attHyperText = ref();
const updateSelectCard = (item: string) => {
  selectCard.value = item;
};
watchEffect(() => {
  if (selectTitle.value) {
    selectHyperText.value = false;
    updateImg(selectTitle.value);
  }
  if (selectTitle.value == undefined) {
    selecImage.value = false;
    updateProcess();
  }
});
function updateImg(title: String) {
  selecImage.value = extractImage(title, imgs.value);
}
function updateProcess() {
  selectHyperText.value = imgs.value[0];
}
function deleteFile(file) {
  console.log(file);
  selectHyperText.value = filesStorage.deleteFile(file);
}
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
