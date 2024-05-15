<template>
  <div class="fit">
    <q-img src="/Background Intranet.png">
      <q-img src="/Great Place to Work.png" class="size-fig" />
      <div class="bg-transparent text q-gutter-sm">
        <h1 class="text-white text-left text-bold">{{ textStart }}</h1>
        <h1 class="text-white text-left text-bold">{{ textMid }}</h1>
        <h1 class="text-green text-left text-bold">{{ textEnd }}</h1>
      </div>
    </q-img>
  </div>
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
.size-fig {
  width: 50vh;
  background-color: transparent;
  top: 3vh;
  right: 65vh;
}
</style>
