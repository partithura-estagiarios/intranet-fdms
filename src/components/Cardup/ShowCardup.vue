<template>
  <q-img
    src="/INTRANET_FUNDIMISA_CARDUP.jpeg"
    class="absolute opacity fixed-full"
  />

  <div class="row overflow-hidden q-pa-md btns">
    <div class="col-md-11 offset-md-6">
      <q-btn color="green" round icon="edit" @click="goEdit()" />
      <q-btn color="green" round icon="print" to="/editCardup" />
    </div>
  </div>
  <div class="row">
    <div
      class="col-3 q-pa-sm q-px-xl q-pb-xl"
      v-for="(day, index) in week"
      :key="index"
    >
      <CardCardup :day="index" :ingredients="day" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { week } from "../Cardup/lib";
import { router } from "../../modules";
const imprimir = () => {
  window.print();
};
const goEdit = () => {
  router.push("/editCardup");
};
</script>
<style scoped>
@page {
  size: landscape;
  margin: 0;
}
@media print {
  .btns {
    visibility: hidden;
  }
}
</style>
