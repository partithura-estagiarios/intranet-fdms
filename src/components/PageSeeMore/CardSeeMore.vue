<template>
  <div class="row pa-100 pt-44 overflow-hidden">
    <div class="pa-5 pl-295">
      <q-btn round color="indigo-8" icon="arrow_back" to="/rhDivulga" />
    </div>
    <q-card>
      <q-card-section class="bg-indigo-8 text-h6 row text-white">
        <div class="col-grow">{{ $t(text.integration) }}</div>
        <div class="col-auto">
          <q-btn flat icon="edit" />
        </div>
      </q-card-section>
      <q-card-section class="row no-padding">
        <q-img
          src="/Image_created_with_a_mobile_phone.png"
          alt="Descrição da imagem"
          height="350px"
          width="450px"
          class="mx-5 my-7"
          no-padding
        >
        </q-img>

        <div class="q-pa-md col-7 my-5">
          <p class="text-h6 text-left">{{ texts.text1 }}</p>
          <p class="text-h6 text-left">{{ texts.text2 }}</p>
        </div>
      </q-card-section>
      <q-card-section class="row q-pt-sm">
        <p class="text-h6 text-left q-pa-md mb-1">{{ texts.text3 }}</p>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import text from "../../../locales/br/text";
import { texts } from "./lib";

onMounted(() => {
  document.body.style.overflow = "hidden";
});
onUnmounted(() => {
  document.body.style.overflow = "visible";
});
</script>
