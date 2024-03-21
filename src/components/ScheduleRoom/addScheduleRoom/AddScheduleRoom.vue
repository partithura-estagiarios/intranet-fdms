<template>
  <q-dialog v-model="card" persistent>
    <q-card class="my-card relative-position" flat>
      <DialogHeader @close="(item) => (card = item)" option="Agendar Evento" />
      <q-card-section class="q-pa-md example-row-reverse">
        <InputSection @envity-room="(room) => (roomSchedule = room)" />
      </q-card-section>
      <q-card-section align="right">
        <q-btn
          color="green"
          :label="$t('formRamal.confirm')"
          @click="saveRoom()"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import DialogHeader from "../../HeaderDialog/DialogHeader.vue";
import * as Mutation from "../../../graphql/scheduleRoom/mutations.gql";
import { adaptScheduleToRoom } from "../addScheduleRoom/lib";
import { DateTime } from "luxon";
const roomSchedule = ref();

const card = ref(true);
async function saveRoom() {
  roomSchedule.value = adaptScheduleToRoom(roomSchedule.value);
  const dateTest1 = new Date(roomSchedule.value.initial_time);
  const dateTest2 = new Date(roomSchedule.value.final_time);
  const dataInicial = DateTime.fromJSDate(dateTest1);
  const dataFinal = DateTime.fromJSDate(dateTest2);
  roomSchedule.value.initial_time = dataInicial.toISO();
  roomSchedule.value.final_time = dataFinal.toISO();
  await runMutation(Mutation.CreateScheduleRoom, { room: roomSchedule.value });
}
</script>
