<template>
  <q-form @submit="saveRoom()">
    <q-card-section class="q-pa-md example-row-reverse">
      <InputSection
        @envity-room="(room) => (roomSchedule = room)"
        @optionRepeat="handleOptionRepeat"
      />
    </q-card-section>
    <q-card-section align="right">
      <div class="font-custom">
        <q-btn color="green" :label="$t('formRamal.confirm')" type="submit" />
      </div>
    </q-card-section>
  </q-form>
</template>

<script setup lang="ts">
import CreateScheduleRoom from "../../../graphql/scheduleRoom/CreateScheduleRoom.gql";
import { adaptScheduleToRoom, fieldsValid } from "../addScheduleRoom/lib";
import { StatusCreateMeeting } from "../../../support/contracts";
import { useEvents } from "../../../stores/events";

const eventStorage = useEvents();
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

const opt = reactive({
  option: "",
  date: "",
});

function handleOptionRepeat(val: string, val2: string) {
  opt.option = val;
  opt.date = val2;
}

async function saveRoom() {
  eventStorage.toogleReload;
  roomSchedule.value = adaptScheduleToRoom(roomSchedule.value);
  const { createScheduleRoom }: { createScheduleRoom: string } =
    await runMutation(CreateScheduleRoom, {
      room: roomSchedule.value,
      opt: opt,
    });
  eventStorage.toogleReload;
  notifyUser(t(`userScheduleRoom.${createScheduleRoom}`), createScheduleRoom);
  return emits("reload", true);
}
</script>
<style scoped>
.font-custom {
  font-family: Fira Sans;
}
</style>
