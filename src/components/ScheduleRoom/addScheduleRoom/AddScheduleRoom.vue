<template>
  <q-card-section class="q-pa-md example-row-reverse">
    <InputSection
      @envity-room="(room) => (roomSchedule = room)"
      :select-date="props.selectDate"
    />
  </q-card-section>
  <q-card-section align="right">
    <div class="q-pa-sl">
      <q-btn
        color="green"
        :label="$t('formRamal.confirm')"
        @click="saveRoom()"
      />
    </div>
  </q-card-section>
</template>

<script setup lang="ts">
import CreateScheduleRoom from "../../../graphql/scheduleRoom/CreateScheduleRoom.gql";
import { adaptScheduleToRoom } from "../addScheduleRoom/lib";
import { DateTime } from "luxon";
const { t } = useI18n();
const props = defineProps({
  selectDate: {
    type: String,
    default: "",
  },
});
const roomSchedule = ref();
const emits = defineEmits(["reload"]);
async function saveRoom() {
  roomSchedule.value = adaptScheduleToRoom(roomSchedule.value);
  const dateTest1 = new Date(roomSchedule.value.initialTime);
  const dateTest2 = new Date(roomSchedule.value.finalTime);
  const dataInicial = DateTime.fromJSDate(dateTest1);
  const dataFinal = DateTime.fromJSDate(dateTest2);
  roomSchedule.value.initialTime = dataInicial.toISO();
  roomSchedule.value.finalTime = dataFinal.toISO();
  if (await runMutation(CreateScheduleRoom, { room: roomSchedule.value })) {
    positiveNotify(t("userScheduleRoom.reunionAccept"));
    return emits("reload", true);
  }
  negativeNotify(t("userScheduleRoom.timeError"));
  return emits("reload", true);
}
</script>
