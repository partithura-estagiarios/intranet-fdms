<template>
  <q-card-section class="q-pa-md example-row-reverse">
    <InputSection @envity-room="(room) => (roomSchedule = room)" />
  </q-card-section>
  <q-card-section align="right">
    <div class="font-custom">
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
import { StatusCreateMeeting } from "../../../support/contracts";

const { t } = useI18n();
const roomSchedule = ref();
const emits = defineEmits(["reload"]);
const notifyUser = (message: string, type: string) => {
  if (type === StatusCreateMeeting.SUCCESS) {
    return positiveNotify(message);
  }
  if (type === StatusCreateMeeting.DATE_CONFLICT) {
    return negativeNotify(message);
  }
  negativeNotify(message);
};

async function saveRoom() {
  roomSchedule.value = adaptScheduleToRoom(roomSchedule.value);
  const dateTest1 = new Date(roomSchedule.value.initialTime);
  const dateTest2 = new Date(roomSchedule.value.finalTime);
  const dataInicial = DateTime.fromJSDate(dateTest1);
  const dataFinal = DateTime.fromJSDate(dateTest2);
  roomSchedule.value.initialTime = dataInicial.toISO();
  roomSchedule.value.finalTime = dataFinal.toISO();
  const { createScheduleRoom }: { createScheduleRoom: string } =
    await runMutation(CreateScheduleRoom, {
      room: roomSchedule.value,
    });
  notifyUser(t(`userScheduleRoom.${createScheduleRoom}`), createScheduleRoom);
  return emits("reload", true);
}
</script>
<style scoped>
.font-custom {
  font-family: Fira Sans;
}
</style>
