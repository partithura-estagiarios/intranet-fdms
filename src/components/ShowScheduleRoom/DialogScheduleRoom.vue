<template>
  <q-card-section>
    <div class="row text-weight-bold">
      {{ $t("text.hourInitial") }}: {{ formatDateTime(room.initialTime) }}
      <q-space class="q-px-md" /> {{ $t("text.hourFinal") }}:
      {{ formatDateTime(room.finalTime) }}
    </div>
  </q-card-section>
  <q-separator />
  <q-card-section class="row">
    <div class="row text-weight-bold">
      {{ $t("text.organizer") }}: {{ room.userCreated.name }}
      <q-space class="q-px-md" />
      {{ $t("text.participants") }}:
      {{ room.totalPeoples }}
      <q-space class="q-px-md" />
      {{ $t("text.ramal") }}:
      {{ room.userCreated.ramalNumber }}
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
      {{ $t("text." + index, { materiais: item }) }}
    </div>
  </q-card-section>
</template>

<script setup lang="ts">
import { DateTime } from "luxon";
const props = defineProps({
  eventShow: {
    type: Object,
    default: () => ({}),
  },
});

const room = ref();

watchEffect(() => {
  if (props.eventShow) {
    room.value = props.eventShow;
  }
});
function formatDateTime(dateTime: Date) {
  return DateTime.fromJSDate(dateTime).toFormat("HH:mm");
}
</script>
