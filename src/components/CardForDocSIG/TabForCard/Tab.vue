<template>
  <q-tabs v-model="tab" class="text-white bg-indigo-8">
    <q-tab
      no-caps
      v-for="(item, index) in tabItems"
      :key="index"
      :name="item.name"
      :label="$t(`cardDocSig.${item.name}`)"
      class="text-bold"
      :class="{ 'text-indigo-8 bg-white rounded-borders': tab === item.name }"
    />
  </q-tabs>
</template>

<script setup lang="ts">
import { tabItems } from "./lib";
const emits = defineEmits(["showCard"]);
const tab = ref("processes");
onMounted(() => {
  emits("showCard", "processes");
});
</script>
