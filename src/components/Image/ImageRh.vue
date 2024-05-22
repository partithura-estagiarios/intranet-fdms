<template>
  <q-img src="/WelcomeIntranet.png" class="size-img" />
</template>
<script setup lang="ts">
import { extratText } from "./lib";
const { t } = useI18n();

const text = ref();
const textStart = ref();
const textMid = ref();
const textEnd = ref();
onMounted(() => {
  text.value = extratText(t("text.welcomeIntranet"));
  textStart.value = text.value[0] + " " + text.value[1];
  textMid.value = text.value[2];
  textEnd.value = text.value[3];
});
</script>
<style scoped>
.text {
  font-size: 1.9vh;
  left: 80vh;
}
.size-img {
  height: 50vh;
}
.size-fig {
  width: 70vh;
  background-color: transparent;
  top: 3vh;
  right: 65vh;
  height: 45vh;
}
</style>
