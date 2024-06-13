<template>
  <div class="q-pa-sl q-pt-md col-6">
    <q-select
      v-model="model"
      :options="props.options.rooms"
      :label="$t('text.selectRoom')"
      class="col-4 border"
    >
      <template #prepend>
        <q-icon
          :name="props.options.icon"
          class="full-height q-px-md custom-color"
          color="white"
        /> </template
    ></q-select>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(["envityDates"]);

const props = defineProps({
  options: {
    type: Object,
    default: {},
  },
});
const model = ref(props.options.value);
watchEffect(() => {
  if (model.value) {
    emits("envityDates", model.value);
  }
});
</script>

<style scoped>
.border {
  border: 1px rgb(29, 29, 167) solid;
  border-radius: 2px;
}
.custom-color {
  background-color: rgb(31, 73, 125);
}
</style>
