<template>
  <div class="div-carousel">
    <q-carousel v-model="slide" class="full-height">
      <q-carousel-slide
        :name="index"
        class="overflow-hidden row no-wrap justify-center"
        v-for="(item, index) in imgs"
      >
        <CardCertification
          v-if="index > 0"
          class="col-3 mt-12 card-left relative-position"
          offset="2"
          :imgs-ex="imgs[index - 1].img"
          :title="imgs[index - 1].title"
          width="500px"
          height="1000px"
        />
        <ButtonForCertification
          v-if="index > 0"
          direction="prev"
          icon="arrow_back"
          @navigation="(nav) => navSlides(nav)"
        />
        <CardCertification
          :imgs-ex="item.img"
          :title="item.title"
          width="1200px"
          height="1000px"
        />
        <ButtonForCertification
          v-if="index < imgs.length - 1"
          direction="next"
          icon="arrow_back"
          class="flip-horizontal"
          @navigation="(nav) => navSlides(nav)"
        />
        <CardCertification
          v-if="index < imgs.length - 1"
          class="col-3 mt-12 card-right relative-position"
          offset="1"
          :imgs-ex="imgs[index + 1].img"
          :title="imgs[index + 1].title"
          width="500px"
          height="1000px"
        />
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script setup lang="ts">
import { imgs } from "./lib";

const slide = ref(0);

function navSlides(direction: string) {
  if (direction === "prev" && slide.value > 0) {
    return slide.value--;
  }
  return slide.value++;
}
</script>
