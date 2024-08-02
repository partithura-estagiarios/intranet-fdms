<template>
  <div @click="showDatePopup = true">
    <q-input
      class="border"
      :label="dateReceived"
      v-bind="$attrs"
      v-model="input"
      dense
      hide-bottom-space
      :rules="[(val) => validateRules(val)]"
      @update:model-value="verify(input)"
    >
      <template #prepend>
        <q-icon
          name="event"
          class="custom-color full-height q-px-md"
          color="white"
        />
      </template>
      <q-popup-proxy>
        <div v-if="showCardDate">
          <CardDate @dateSelected="handleDateSelected" />
        </div>
        <div v-if="showTimePopup">
          <CardTime @timeSelected="handleTimeSelected" />
        </div>
      </q-popup-proxy>
    </q-input>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(["envityDates"]);
const props = defineProps({
  label: { type: String, required: true },
});
const input = ref("");
const inputHours = ref("");
const inputMinutes = ref("");
const dateReceived = ref(props.label);
const showDatePopup = ref(false);
const showTimePopup = ref(false);
const closePopUp = ref(false);
const verifyTimeIsNotEmpty = /^(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})$/;

const showCardDate = computed(() => {
  return !closePopUp.value && !showTimePopup.value;
});

const handleDateSelected = (date: string) => {
  inputHours.value = date;
  input.value = date;
  showTimePopup.value = true;
  closePopUp.value = false;
};

const handleTimeSelected = (time: string) => {
  inputMinutes.value = time;
  input.value = `${input.value} ${time}`;
  emits("envityDates", input.value);
  showTimePopup.value = false;
  closePopUp.value = true;
};

function verify(input: string) {
  const [date, time] = input.split(" ");
  showTimePopup.value = !time && !!date;
  closePopUp.value = !!time;
}
function validateRules(val: string) {
  if (!val) {
    return "Data e hora são obrigatórios";
  }
  const match = val.match(verifyTimeIsNotEmpty);
  if (!match) {
    return "Informe a hora da reunião";
  }
}
</script>

<style scoped>
.border {
  border: 0.1rem solid rgb(31, 73, 125);
  border-radius: 0.2rem;
}
.custom-color {
  background-color: rgb(31, 73, 125);
}
</style>
