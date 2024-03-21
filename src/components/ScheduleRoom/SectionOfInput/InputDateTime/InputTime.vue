<template>
  <div class="q-pa-sm">
    <q-input
      filled
      bg-color="white"
      class="border"
      readonly
      :label="date"
      v-bind="$attrs"
    >
      <template #before>
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
          emits('envityDates', date);
        }
      "
      :final-time="date"
    />
  </div>
</template>

<script setup lang="ts">
import { verifyReceivedDate } from "../../addScheduleRoom/lib";
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

const card = ref(false);
const date = ref();
watchEffect(() => {
  if (verifyReceivedDate(props.dateInput)) {
    return (date.value = verifyReceivedDate(props.dateInput));
  }
  return (date.value = props.label);
});
</script>

<style scoped>
.border {
  border: 1px rgb(29, 29, 167) solid;
  border-radius: 2px;
}
</style>
