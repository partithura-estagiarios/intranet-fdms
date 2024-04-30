<template>
  <div class="q-pa-md">
    <q-carousel
      transition-prev="slide-right"
      transition-next="slide-left"
      animated
      control-color="primary"
      class="rounded-borders"
      v-model="slide"
      height="auto"
    >
      <q-carousel-slide name="style" class="row">
        <CardRhDIvulga />
        <!-- <Pagination
          :totalPages="totalPages"
          :currentPage="slide"
          class="col-md-3 offset-md-9"
        /> -->
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const totalPages = ref();
const slide = ref("style");
</script>

<style scoped>
.rounded-borders {
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
