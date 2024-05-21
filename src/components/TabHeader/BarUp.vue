<template>
  <q-toolbar class="bg-indigo-8 q-pa-md">
    <q-btn flat to="/home" class="absolute-top-left">
      <img src="/ico/logo_fundimisa.png" class="q-pt-md" />
    </q-btn>
    <q-space />
    <q-tabs
      v-model="tab"
      indicator-color="transparent"
      class="text-white no-padding no-padding custom-tab-label"
      active-bg-color="white"
      shrink
      active-color="indigo-8"
    >
      <q-route-tab
        v-for="item in tabItems"
        :key="item.name"
        :name="item.name"
        :label="$t('tab.' + item.label)"
        :to="'/' + item.name"
      />
    </q-tabs>
    <q-space />
    <div class="row absolute-top-right q-mt-md">
      <BtDropSet />
    </div>
  </q-toolbar>
</template>

<script setup lang="ts">
import { tabItems } from "./lib";
const tab = ref("");
</script>
<style scoped>
.custom-tab-label {
  line-height: 1vh;
}
</style>
