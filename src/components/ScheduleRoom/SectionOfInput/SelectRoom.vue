<template>
  <div class="q-pa-sm col-6">
    <q-select
      v-model="model"
      :options="props.options.rooms"
      bg-color="white"
      :label="$t('text.selectRoom')"
      color="indigo-8"
      class="col-4 border"
    >
      <template #prepend>
        <q-icon
          :name="props.options.icon"
          class="bg-indigo-8 full-height q-px-md"
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
</style>
