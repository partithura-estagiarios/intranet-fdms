<template>
  <q-menu :auto-close="false" v-model="props.enablePicker">
    <q-icon-picker
      v-model="value"
      :icons="icons"
      class="menu-icons"
      tooltips
      @click="emits('auto-close', value)"
    />
  </q-menu>
</template>

<script setup lang="ts">
import { QIconPicker } from "@quasar/quasar-ui-qiconpicker";

const emits = defineEmits(["auto-close"]);
const props = defineProps({
  enablePicker: {
    type: Boolean,
    required: true,
  },
});
const value = ref();
const icons = [
  { name: "camera" },
  { name: "home" },
  { name: "login" },
  { name: "close" },
  { name: "menu" },
  { name: "check" },
];
</script>
<style scoped>
.custom-color {
  color: rgb(31, 73, 125);
}
.menu-icons {
  height: 5rem;
  width: 11rem;
  color: rgb(31, 73, 125);
}
</style>
