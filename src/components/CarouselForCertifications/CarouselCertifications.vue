<template>
  <div>
    <q-carousel v-model="slide" class="full-height bg-transparent">
      <q-carousel-slide
        :name="index"
        class="overflow-hidden row no-wrap justify-center"
        v-for="(item, index) in imgs"
      >
        <CardCertification
          v-if="index > 0"
          class="col-5 mt-12 card-left relative-position"
          :imgs-ex="imgs[index - 1].img"
          :title="imgs[index - 1].title"
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
          class="col-5 relative-position"
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
          class="col-5 mt-12 card-right relative-position"
          :imgs-ex="imgs[index + 1].img"
          :title="imgs[index + 1].title"
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
