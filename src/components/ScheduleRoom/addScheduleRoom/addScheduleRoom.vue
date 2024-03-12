<template>
  <q-btn label="Card" color="primary" @click="card = true" />
  <q-dialog v-model="card" persistent>
    <q-card class="my-card relative-position" flat>
      <q-card-section class="bg-indigo-8 row justify-between text-white">
        <div class="q-pa-md text-h5">Agendar Sala</div>
        <q-icon
          name="close"
          class="pt-2 cursor-pointer"
          size="45px"
          @click="card = false"
        />
      </q-card-section>
      <q-card-section class="q-pa-md example-row-reverse">
        <InputSection
          :inputs-room="inputs"
          @save-schedule-room="(item) => (scheduleRoom = item)"
        />
      </q-card-section>
      <q-card-section align="center">
        <q-btn color="indigo-8" label="Confirmar" @click="putScheduleRoom()" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { inputsForScheduleRoom } from "./lib";
import CreateScheduleRoom from "../../../graphql/scheduleRoom/mutations.gql";
const inputs = ref(inputsForScheduleRoom[0]);
const card = ref(false);
const emits = defineEmits(["close", "reloadTable"]);
const scheduleRoom = ref();
async function putScheduleRoom() {
  console.log(
    await runMutation(CreateScheduleRoom, { room: scheduleRoom.value }),
  );
}
</script>
<style scoped>
.my-card {
  width: 100%;
}
</style>
