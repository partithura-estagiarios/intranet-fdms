<template>
  <q-dialog v-model="card" :persistent="true">
    <q-card>
      <DialogHeader
        @close="closeAddModalMeet"
        :option="$t('text.organizerEvent')"
        class="q-py-sm"
      />
      <q-form @submit="saveRoom()">
        <q-card-section class="q-pa-md example-row-reverse">
          <InputSection
            @envity-room="(room) => (roomSchedule = room)"
            @optionRepeat="handleOptionRepeat"
          />
        </q-card-section>
        <q-card-section align="right" class="q-py-sm">
          <q-btn
            class="font-custom"
            color="green"
            :label="$t('formRamal.confirm')"
            type="submit"
          />
        </q-card-section>
      </q-form>

      <LoadingEvent :visible="eventStorage.loading" />
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import CreateScheduleRoom from "../../../graphql/scheduleRoom/CreateScheduleRoom.gql";
import { adaptScheduleToRoom } from "../addScheduleRoom/lib";
import { StatusCreateMeeting } from "../../../support/contracts";
import { useEvents } from "../../../stores/events";
import { EventRoom, ResultCreateMeet } from "../../../entities/scheduleRoom";

const props = defineProps({
  card: {
    type: Boolean,
    required: true,
  },
});
const eventStorage = useEvents();
const { t } = useI18n();
const roomSchedule = ref();
const emits = defineEmits(["reload", "close"]);
const card = ref(props.card);
const opt = reactive({
  option: "",
  date: "",
});

const notifyUser = (message: string, type: string) => {
  if (type === StatusCreateMeeting.SUCCESS) {
    return positiveNotify(message);
  }
  if (type === StatusCreateMeeting.DATE_CONFLICT) {
    return negativeNotify(message);
  }
  negativeNotify(message);
};

function handleOptionRepeat(valOpt: string, valDate: string) {
  opt.option = valOpt;
  opt.date = valDate;
}

async function saveRoom() {
  eventStorage.toogleReload;
  roomSchedule.value = adaptScheduleToRoom(roomSchedule.value);
  const { createScheduleRoom }: { createScheduleRoom: ResultCreateMeet } =
    await runMutation(CreateScheduleRoom, {
      room: roomSchedule.value,
      opt: "Não",
    });
  eventStorage.toogleReload;
  notifyUser(
    t(`userScheduleRoom.${createScheduleRoom.message}`),
    createScheduleRoom.message,
  );
  closeAddModalMeet();
  return emits("reload", true);
}

function closeAddModalMeet() {
  card.value = false;
  return emits("close");
}

watchEffect(() => {
  if (props.card) {
    card.value = props.card;
  }
});
</script>
<style scoped>
.font-custom {
  font-family: Fira Sans;
}
</style>
