<template>
  <q-card-section>
    <div class="row text-weight-bold text-green">
      <q-icon name="event" size="sm" />
      {{ $t("text.hourInitial") }}: {{ formatDateTime(room.initialTime) }}
      <q-space class="q-px-md" /> <q-icon name="event" size="sm" />
      {{ $t("text.hourFinal") }}:
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
  <q-card-section class="row text-weight-bold trd">
    {{ $t("text.supportMaterial") }}:
    <div
      class="row text-weight-bold q-px-md"
      v-for="(item, index) in renameKeysOfSupport(room.support)"
      v-show="item"
      :key="index"
    >
      <q-icon :name="item?.toString()" size="sm" />
      <p>{{ $t("text." + index) }}</p>
    </div>
    <q-icon name="new_releases" size="sm" />
    <p>{{ helpersValueFromMaterialSup }}</p>
  </q-card-section>
</template>

<script setup lang="ts">
import { formatDateTime, renameKeys } from "./lib";
import { SuPMaterials } from "../../entities/supportMaterials";
const props = defineProps({
  eventShow: {
    type: Object,
    default: () => ({}),
  },
});

const room = ref();
const helpersValueFromMaterialSup = ref();
watchEffect(() => {
  if (props.eventShow) {
    room.value = props.eventShow;
  }
});
function renameKeysOfSupport(materialsSup: SuPMaterials) {
  if (materialsSup["helpers"]) {
    helpersValueFromMaterialSup.value = materialsSup["helpers"];
    console.log(helpersValueFromMaterialSup.value);
    delete materialsSup["helpers"];
  }
  return renameKeys(materialsSup);
}
</script>
