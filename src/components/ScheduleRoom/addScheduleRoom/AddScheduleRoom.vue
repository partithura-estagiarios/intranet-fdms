<template>
  <q-card-section class="q-pa-md example-row-reverse">
    <InputSection
      @envity-room="(room) => (roomSchedule = room)"
      @option-repeat="
        (val, val2) => ((opt.option = val), (opt.date = new Date(val2)))
      "
    />
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
  date: new Date(),
});

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
