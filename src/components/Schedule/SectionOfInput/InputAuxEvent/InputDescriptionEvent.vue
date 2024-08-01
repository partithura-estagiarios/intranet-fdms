<template>
  <q-input
    outlined
    v-model="input"
    :label="$t('text.descriptionOfEvent')"
    class="q-py-md"
    dense
    type="text"
    :rules="[(val) => validateNotEmpty(val)]"
    hide-bottom-space
  >
    <template #prepend>
      <q-icon
        class="custom-color full-height q-px-md"
        color="white"
        name="title"
      />
    </template>
  </q-input>
  <!-- <SelectRepeat @optionRepeat="handleOptionRepeat" /> -->
</template>

<script setup lang="ts">
import { useFieldValidation } from "../../../../composables/rules";

const date = ref();
const text = ref();
const input = ref();
const { validateNotEmpty } = useFieldValidation();
const emits = defineEmits(["optionRepeat", "desc"]);
const props = defineProps({
  inputDescription: {
    type: String,
    required: true,
  },
});

function handleOptionRepeat(val: string, val2: Date) {
  text.value = val;
  date.value = val2;
  emits("optionRepeat", text, date, input);
}
</script>
<style scoped>
.custom-color {
  background-color: rgb(31, 73, 125);
  right: 0.7rem;
  width: 1.6rem;
}
</style>
