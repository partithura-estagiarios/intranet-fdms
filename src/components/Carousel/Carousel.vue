<template>
  <div>
    <q-carousel
      v-model="slide"
      swipeable
      animated
      padding
      arrows
      height="410px"
      class="rounded-borders bg-indigo-8"
    >
      <q-carousel-slide name="style" class="slide">
        <h5 class="title-rh">Atendimento RH</h5>
        <div class="card-container q-pa-md" horizontal>
          <Card class="card" />
        </div>
      </q-carousel-slide>
      <template v-slot:control>
        <q-carousel-control class="btns-carousel" position="bottom-left">
          <div class="btns_group">
            <q-btn
              v-for="(item, index) in items"
              class="btn"
              round
              padding="none"
              color="white"
              icon="ball"
              :size="activeIndex === index ? '6px' : ''"
              @click="changeSlide(index)"
            />
          </div>
        </q-carousel-control>
      </template>
    </q-carousel>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const slide = ref("style");
const items = [1, 2, 3, 4, 5];

const activeIndex = ref(0);
const changeSlide = (index: number) => {
  activeIndex.value = index;
};
</script>

<style scoped>
.slide {
  display: inline-block;
}
.card-container {
  display: flex;
  justify-content: flex-end;
  position: relative;
  top: -20px;
}
.btns-carousel {
  border-radius: 10px;
  background-color: rgba(
    190,
    191,
    196,
    0.5
  ); /* Altere 0.5 para ajustar a opacidade conforme necessário */
  width: 4.5%;
  justify-items: center;
}
.btn {
  font-size: 5px; /* You can adjust this value to your preference */
  margin-left: 5px;
}
.title-rh {
  color: white;
  margin: 0%;
  margin-left: 48%;
  justify-self: end;
  font-weight: bold;
}
</style>
