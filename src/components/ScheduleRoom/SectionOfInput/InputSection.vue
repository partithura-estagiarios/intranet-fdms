<template>
  <div class="row">
    <div class="col">
      Informações do usuário
      <div class="column">
        <div v-for="(itemS, index) in stringsInfo" :key="index">
          <q-input v-model="stringsInfo[index]" :label="`${index}`" />
        </div>
        <div v-for="(itemN, index) in inputNumber" :key="index">
          <q-input
            type="number"
            v-model="inputNumber[index]"
            :label="`${index}`"
          />
        </div>
      </div>
    </div>
    <q-space class="q-pa-md" />
    <div class="col">
      Informações da sala
      <div class="column">
        <div v-for="(itemSe, index) in selectInfo" :key="index">
          <q-select
            :options="itemSe"
            :label="`${index}`"
            v-model="itemSe.index"
          />
        </div>
        <div v-for="(itemB, index) in inputsCheck" :key="index">
          <q-checkbox
            :label="`${index}`"
            :model-value="itemB"
            @click="toggleCheckbox(index)"
          />
        </div>
      </div>
    </div>
    <q-space class="q-pa-md" />
    <div class="col">
      Informações do Horário
      <div class="column">
        <input-date-time @envity-date="handleDateSelection" />
        <input-time @envity-time="handleTimeSelection" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  objectScheduleRoom,
  verificaPropriedadesPreenchidas,
} from "../addScheduleRoom/lib";
const emits = defineEmits(["saveScheduleRoom"]);
const props = defineProps({
  inputsRoom: {
    type: Object,
    required: false,
  },
});
const inputsCheck = ref(props.inputsRoom.booleanInfos);
const inputNumber = ref(props.inputsRoom.numberInfo);
const selectInfo = ref(props.inputsRoom.selectInfo);
const stringsInfo = ref(props.inputsRoom.stringsInfo);
const receivedData = ref("");
const receivedTimeInitial = ref("");
const receivedTimeFinal = ref("");

function toggleCheckbox(index: number) {
  inputsCheck.value[index] = !inputsCheck.value[index];
}
const handleTimeSelection = (time1: string, time2: string) => {
  receivedTimeInitial.value = time1;
  receivedTimeFinal.value = time2;
};
const handleDateSelection = (data: string) => {
  receivedData.value = data;
};
watchEffect(() => {
  objectScheduleRoom.support = inputsCheck.value;
  objectScheduleRoom.user_created.user_registration =
    inputNumber.value.user_registration;
  objectScheduleRoom.user_created.ramal_number = inputNumber.value.ramal;
  objectScheduleRoom.description.total_people = inputNumber.value.total_people;
  objectScheduleRoom.user_created.email = stringsInfo.value.email;
  objectScheduleRoom.user_created.name = stringsInfo.value.name;
  objectScheduleRoom.location = selectInfo.value.options.index;
  objectScheduleRoom.description.rules = selectInfo.value.rules.index;
  console.log(receivedData.value);
  console.log(`T${receivedTimeInitial.value}:00+00:00`);
  objectScheduleRoom.initial_time =
    receivedData.value + `T${receivedTimeInitial.value}:00+00:00`;
  objectScheduleRoom.final_time =
    receivedData.value + `T${receivedTimeFinal.value}:00+00:00`;
  if (verificaPropriedadesPreenchidas(objectScheduleRoom)) {
    emits("saveScheduleRoom", objectScheduleRoom);
  }
});
</script>

<style scoped></style>
