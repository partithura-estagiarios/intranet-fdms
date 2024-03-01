<template>
  <q-carousel
    v-model="slide"
    swipeable
    animated
    padding
    infinite
    class="carousel"
    height="auto"
  >
    <q-carousel-slide name="style" class="slide no-padding">
      <q-img
        class="img-in-carousel"
        src="/INTRANET_FUNDIMISA_ATENDIMENTO_RH.png"
      />
    </q-carousel-slide>
    <template v-slot:control>
      <q-carousel-control position="bottom-left">
        <q-btn-group rounded class="bg-grey-6">
          <ButtonsAtendimentoRh />
        </q-btn-group>
      </q-carousel-control>
    </template>
  </q-carousel>
</template>

<script setup lang="ts">
const slide = ref("style");
</script>
