<template>
  <div
    v-for="(item, index) in checkBoxes"
    class="q-pa-sm col-6 q-gutter-sl"
    :key="index"
    @click="toggleCheckbox(item)"
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
              class="custom-color full-height q-px-md"
              color="white"
            />
          </template>
          <template #append>
            <q-checkbox v-model="item.value" />
          </template>
        </q-input>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CheckBox } from "../../../entities/item";
const emits = defineEmits(["envityDates"]);
const props = defineProps({
  checks: {
    type: Object as () => Record<string, { icon: string; value: boolean }>,
    default: () => ({}),
  },
});
const inputValue = ref("");
const checkBoxes = reactive(props.checks);
const toggleCheckbox = (item: CheckBox) => {
  item.value = !item.value;
};

watchEffect(() => {
  emits("envityDates", checkBoxes);
});
</script>

<style scoped>
.border {
  border: 0.1rem rgb(29, 29, 167) solid;
  border-radius: 0.2rem;
}
.custom-color {
  background-color: rgb(31, 73, 125);
}
</style>
