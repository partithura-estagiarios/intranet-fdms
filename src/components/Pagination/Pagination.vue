<template>
  <div class="mt-2">
    <q-btn
      class="btn-direction"
      unelevated
      no-caps
      size="19px"
      @click="changeColor(activeButtonIndex - 1)"
    >
      <label>{{ $t("text.previous") }}</label>
    </q-btn>
    <q-badge
      v-for="index in props.pages"
      @click="changeColor(index)"
      :color="buttonColors[index - 1]"
      class="btns-pag text-indigo-8 cursor-pointer"
      :class="{
        'text-white': activeButtonIndex === null || activeButtonIndex === index,
      }"
      unelevated
      ><span :class="{ 'text-white': activeButtonIndex === index }">{{
        index
      }}</span></q-badge
    >

    <q-btn
      class="btn-direction"
      unelevated
      no-caps
      size="19px"
      @click="changeColor(activeButtonIndex + 1)"
    >
      <label>{{ $t("text.next") }}</label>
    </q-btn>
  </div>
</template>
<script setup lang="ts">
import { firstPage } from "../TableRamais/lib";
const emits = defineEmits(["changePage"]);
const props = defineProps({
  pages: { type: String, required: true },
});
const buttonColors = ref<string[]>(Array(10).fill("transparent"));
const activeButtonIndex = ref();
const changeColor = (index: number) => {
  const indexPage = index - 1;
  if (activeButtonIndex.value !== null) {
    buttonColors.value[activeButtonIndex.value - 1] = "transparent";
  }
  buttonColors.value[index - 1] = "green-8";
  activeButtonIndex.value = index;
  emits("changePage", indexPage);
};
onMounted(() => {
  changeColor(Number(firstPage));
});
</script>
