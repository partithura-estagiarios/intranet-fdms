<template>
  <q-dialog v-model="card">
    <q-card class="my-card" v-if="room">
      <header-d
        @close="(item) => (card = item)"
        :option="room.description.rules"
      />
      <q-separator />

      <q-card-section>
        <div class="row text-weight-bold">
          {{ $t("text.hourInitial") }}: {{ room.timeInitial }}
          <q-space class="q-px-md" /> {{ $t("text.hourFinal") }}:
          {{ room.timeFinal }}
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section class="row">
        <div class="row text-weight-bold">
          {{ $t("text.organizer") }}: {{ room.user_created.name }}
          <q-space class="q-px-md" />
          {{ $t("text.participants") }}:
          {{ room.description.total_people }}
          <q-space class="q-px-md" />
          {{ $t("text.ramal") }}:
          {{ room.user_created.ramal_number }}
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section class="row text-weight-bold">
        {{ $t("text.supportMaterial") }}:
        <div
          class="row text-weight-bold q-px-md"
          v-for="(item, index) in room.support"
          v-show="item"
        >
          {{ $t("text." + index) }}
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import * as Query from "../../graphql/scheduleRoom/queries.gql";
import { getHoursMinutes } from "./lib";
const card = ref(true);
const room = ref();
onMounted(async () => {
  const { getScheduleRoom } = await runQuery(Query.GetScheduleRoom);
  if (getScheduleRoom.length > 0) {
    getScheduleRoom.forEach((event) => {
      event.timeInitial = getHoursMinutes(event.initial_time);
      event.timeFinal = getHoursMinutes(event.final_time);
    });
    room.value = getScheduleRoom[0];
  }
});
</script>

<style scoped></style>
