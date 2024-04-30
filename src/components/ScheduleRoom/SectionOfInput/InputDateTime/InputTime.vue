<template>
  <div class="q-pa-sl">
    <q-input
      class="border"
      readonly
      :label="dateReceived"
      v-bind="$attrs"
      v-model="inputValue"
      @click="card = true"
    >
      <template #prepend>
        <q-icon
          name="event"
          class="bg-indigo-8 full-height q-px-md"
          color="white"
          @click="card = true"
        >
        </q-icon>
      </template>
    </q-input>
    <CardDateTime
      :show-card="card"
      @close="
        (down, date) => {
          card = down;
          dateReceived = date;
          emits('envityDates', date);
        }
      "
      :final-time="dateReceived"
    />
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(["envityDates", "envityHour"]);
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  dateInput: {
    type: String,
    default: "",
  },
});
const inputValue = ref("");

const card = ref(false);
const dateReceived = ref();
watchEffect(() => {
  const value = props.dateInput || props.label;
  dateReceived.value = value;
});
</script>

<style scoped>
.border {
  border: 1px rgb(29, 29, 167) solid;
  border-radius: 2px;
}
</style>
