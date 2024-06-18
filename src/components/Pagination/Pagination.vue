<template>
  <div>
    <q-btn
      class="text-black"
      unelevated
      no-caps
      @click="changeColor(activeButtonIndex - firstPosition)"
      :disable="activeButtonIndex == firstPage"
    >
      <label>{{ $t("text.previous") }}</label>
    </q-btn>
    <q-badge
      v-for="(num, index) in buttonColors"
      @click="changeColor(index)"
      :color="buttonColors[index - firstPosition]"
      class="btns-pag text-indigo-8 cursor-pointer"
      :class="{
        'text-white': activeButtonIndex === null || activeButtonIndex === index,
      }"
      unelevated
    >
      <span :class="{ 'text-white': activeButtonIndex === index }">{{
        index + firstPosition
      }}</span>
    </q-badge>

    <q-btn
      class="text-black"
      unelevated
      no-caps
      @click="changeColor(activeButtonIndex + firstPosition)"
      :disable="activeButtonIndex == props.pages - firstPosition"
    >
      <label>{{ $t("text.next") }}</label>
    </q-btn>
  </div>
</template>

<script setup lang="ts">
import { firstPage } from "../TableRamais/lib";
const emits = defineEmits(["changePage"]);
const props = defineProps({
  pages: { type: Number, required: true },
});
const firstPosition = ref(1);
const buttonColors = ref<string[]>(Array(props.pages).fill("transparent"));
const activeButtonIndex = ref();
const changeColor = (index: number) => {
  if (activeButtonIndex.value !== null) {
    buttonColors.value[activeButtonIndex.value - firstPosition.value] =
      "transparent";
  }
  buttonColors.value[index - firstPosition.value] = "green-8";
  activeButtonIndex.value = index;
  emits("changePage", index);
};
onMounted(() => {
  changeColor(firstPage);
});
watch(
  () => props.pages,
  (newPages: number) => {
    buttonColors.value = Array(newPages).fill("transparent");
    changeColor(firstPage);
  },
);
</script>
