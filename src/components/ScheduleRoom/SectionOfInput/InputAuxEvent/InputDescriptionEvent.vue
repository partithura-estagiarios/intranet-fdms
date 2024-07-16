<template>
  <div class="row size">
    <q-input
      outlined
      v-model="props.inputDescription"
      :label="$t('text.descriptionOfEvent')"
      class="q-py-md"
      dense
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
  <SelectRepeat
    @optionRepeat="(val, val2) => $emit('optionRepeat', val, val2)"
  />
</template>

<script setup lang="ts">
const text = ref();
const props = defineProps({
  inputDescription: {
    type: String,
    required: true,
  },
});
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
