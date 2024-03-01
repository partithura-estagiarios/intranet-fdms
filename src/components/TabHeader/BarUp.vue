<template>
  <q-tabs
    v-model="tab"
    class="tab-header z-top text-white fixed-top ellipsis"
    :style="{ backgroundColor: tabBackgroundColor }"
  >
    <q-item clickable to="/home" class="q-mx-md q-mt-sm">
      <q-toolbar-title class="q-px-md">
        <img src="/ico/logo_fundimisa.png" />
      </q-toolbar-title>
    </q-item>
    <q-space />
    <q-tabs v-model="tab" class="font-tabs bg-transparent text-white q-pa-md">
      <q-route-tab
        no-caps
        v-for="item in tabItems"
        :key="item.name"
        :name="item.name"
        :label="$t('tab.' + item.label)"
        class="text-bold"
        :class="{ 'text-indigo-8 bg-white rounded-borders': tab === item.name }"
        :to="'/' + item.name"
      />
    </q-tabs>
    <q-space />

    <bt-drop-set />
  </q-tabs>
</template>

<script setup lang="ts">
import { tabItems } from "./lib";
const tab = ref("");
const tabBackgroundColor = ref("rgba(57, 73, 171, 1)");
const scrollTop = ref(0);
function handleScroll() {
  scrollTop.value = window.pageYOffset;
  if (!scrollTop.value) {
    return (tabBackgroundColor.value = "rgba(57, 73, 171, 1)");
  }
  return (tabBackgroundColor.value = "rgba(63, 81, 181, 0.8)");
}
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
watchEffect(() => {
  handleScroll;
});
</script>
