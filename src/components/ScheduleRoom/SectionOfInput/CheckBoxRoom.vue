<template>
  <div
    v-for="(item, index) in checkBoxes"
    class="q-pa-sm col-6 q-gutter-sl"
    :key="index"
  >
    <div class="q-gutter-md row items-center">
      <div class="col">
        <q-input
          :label="$t('text.' + index)"
          class="border"
          readonly
          v-model="inputValue"
        >
          <template #prepend>
            <q-icon
              :name="item.icon"
              class="bg-indigo-8 full-height q-px-md"
              color="white"
            />
          </template>
        </q-input>
      </div>
      <div class="col-auto">
        <q-checkbox v-model="item.value" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(["envityDates"]);
const props = defineProps({
  checks: {
    type: Object as () => Record<string, { icon: string; value: boolean }>,
    default: () => ({}),
  },
});
const inputValue = ref("");
const checkBoxes = reactive(props.checks);
watchEffect(() => {
  emits("envityDates", checkBoxes);
});
</script>

<style scoped>
.border {
  border: 1px rgb(29, 29, 167) solid;
  border-radius: 2px;
}
</style>
