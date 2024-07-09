<template>
  <q-card-section>
    <div class="row text-weight-bold text-green">
      <q-icon name="event" size="sm" />
      {{ $t("text.hourInitial") }}: {{ getHours(room.initialTime) }}
      <q-space class="q-px-md" /> <q-icon name="event" size="sm" />
      {{ $t("text.hourFinal") }}:
      {{ getHours(room.finalTime) }}
    </div>
  </q-card-section>
  <q-separator />
  <q-card-section class="row color-custom q-px-sm justify-between">
    <div class="text-weight-bold q-px-sm">
      <q-icon name="person" size="sm" />
      {{ $t("text.organizer") }}: {{ room.host.name }}
    </div>
    <div class="text-weight-bold q-px-sm">
      <q-icon name="people" size="sm" />
      {{ $t("text.participants") }}: {{ room.totalPeoples }}
    </div>
  </q-card-section>
  <q-separator />
  <q-card-section class="row color-custom q-px-sm justify-between">
    <div class="text-weight-bold q-px-sm">
      <q-icon name="call" size="sm" />
      {{ $t("text.ramal") }}: {{ room.host.ramalNumber }}
    </div>
    <div class="text-weight-bold q-px-sm">
      <q-icon name="credit_card" size="sm" />
      {{ $t("text.registration") }}: {{ room.host.userRegistration }}
    </div>
  </q-card-section>
  <q-separator />
  <q-card-section class="text-weight-bold color-custom text-center">
    <div class="bold">{{ $t("text.supportMaterial") }}</div>
  </q-card-section>
  <q-card-section class="row text-weight-bold color-custom">
    <div
      class="row text-weight-bold q-px-sm"
      v-for="(item, index) in roomSupport"
      v-show="item"
      :key="index"
    >
      <p>{{ $t(`text.${index}`) }}</p>
    </div>
    <p>{{ helpersValueFromMaterialSup }}</p>
  </q-card-section>
</template>

<script setup lang="ts">
import { getHours } from "./lib";
const props = defineProps({
  eventShow: {
    type: Object,
    default: () => ({}),
  },
});

const room = ref();
const helpersValueFromMaterialSup = ref();
const roomSupport = ref();

watchEffect(() => {
  if (props.eventShow) {
    room.value = props.eventShow;
    roomSupport.value = {};
    for (const key in room.value.support) {
      if (key !== "helpers") {
        roomSupport.value[key] = room.value.support[key];
      }
    }
    helpersValueFromMaterialSup.value = room.value.support["helpers"];
  }
});
</script>
<style scoped>
.color-custom {
  color: rgb(31, 73, 125);
}
</style>
