<template>
  <div>
    <div v-if="filteredImages.length === FIRST_SLIDE">
      <q-img
        :src="getImageUrl(filteredImages[POSITION_IMG])"
        class="image-item"
        spinner-color="white"
      />
    </div>
    <div v-if="filteredImages.length > FIRST_SLIDE">
      <q-carousel
        v-model="slide"
        prev-icon="arrow_circle_left"
        next-icon="arrow_circle_right"
        swipeable
        animated
        arrows
        thumbnails
        infinite
        control-color="green"
        class="carousel-image"
      >
        <q-carousel-slide
          v-for="(img, index) in filteredImages"
          :name="index"
          :img-src="getImageUrl(img)"
        >
        </q-carousel-slide>
      </q-carousel>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";
import { FoldersIntitutional } from "../../../entities/imgsInstitutional";
import { server_express_url } from "../lib";
const FIRST_SLIDE = 1;
const POSITION_IMG = 0;
const props = defineProps({
  folders: {
    type: Array as () => FoldersIntitutional[],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});
const slide = ref(FIRST_SLIDE);
const filteredImages = computed(() => {
  const folder = props.folders.find((folder) => folder.name === props.name);
  if (folder) {
    return folder.caminhos;
  }
  return [];
});
const getImageUrl = (imageName: string) => {
  return `${server_express_url}/serve-image/${encodeURIComponent(imageName)}`;
};
</script>

<style scoped>
.image-item {
  width: 60rem;
  height: 43rem;
}

.carousel-image {
  width: 60rem;
  height: 43rem;
}
</style>
