<template>
  <div class="row size">
    <q-input
      outlined
      v-model="input"
      :label="$t('text.descriptionOfEvent')"
      class="q-py-md"
      dense
      type="text"
      :rules="[(val) => (val && val.length > 0) || $t('auth.fillField')]"
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
  </div>
  <SelectRepeat @optionRepeat="handleOptionRepeat" />
</template>

<script setup lang="ts">
const date = ref();
const text = ref();
const input = ref();
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
.size {
  width: 15.6rem;
}
.custom-color {
  background-color: rgb(31, 73, 125);
  right: 0.7rem;
  width: 1.6rem;
}
</style>
