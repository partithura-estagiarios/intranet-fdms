<template>
  <q-toolbar class="color-custom q-py-lg z-top">
    <q-btn flat to="/home" class="q-py-sm q-px-md absolute-top-left">
      <img src="/ico/LOGO_FUNDIMISA.png" class="q-py-md" />
    </q-btn>

    <q-space class="q-px-xl q-mx-xl" />
    <q-tabs
      v-model="tab"
      indicator-color="transparent"
      class="font-route-tab text-white"
      v-for="item in tabItems"
    >
      <q-btn
        :class="tabClass(item.name)"
        no-caps
        @click="goToRoute(item.name)"
        flat
        size="1.2rem"
        class="q-py-xs q-mx-sm q-px-sm"
        dense
        :label="$t(`tab.${item.label}`)"
      />
    </q-tabs>

    <q-space />
    <div class="row absolute-top-right q-py-md q-px-sm">
      <BtDropSet />
    </div>
  </q-toolbar>
</template>

<script setup lang="ts">
import { tabItems } from "./lib";
import { router } from "../../modules/router";

const tab = ref("home");
function tabClass(itemName: string) {
  if (`/${itemName}` === router.currentRoute.value.path)
    return "text-green bg-white rounded-borders	";
}
function goToRoute(rout: String) {
  return router.push(`/${rout}`);
}
onMounted(() => {
  goToRoute("home");
});
</script>
<style scoped>
.font-route-tab {
  font-family: Fira Sans;
}
.color-custom {
  background-color: rgb(31, 73, 125);
}
</style>
