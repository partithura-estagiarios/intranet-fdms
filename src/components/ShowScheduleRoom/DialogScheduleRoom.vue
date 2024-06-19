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
  <q-card-section class="row color-custom">
    <div class="text-weight-bold q-col q-px-sm">
      {{ $t("text.organizer") }}: {{ room.host.name }}
    </div>
    <div class="text-weight-bold q-col q-px-sm">
      {{ $t("text.participants") }}: {{ room.totalPeoples }}
    </div>
    <div class="text-weight-bold q-col q-px-sm">
      {{ $t("text.ramal") }}: {{ room.host.ramalNumber }}
    </div>
    <div class="text-weight-bold q-col q-px-sm">
      {{ $t("text.registration") }}: {{ room.host.userRegistration }}
    </div>
  </q-card-section>
  <q-separator />
  <q-card-section class="row text-weight-bold color-custom">
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
    <q-icon
      name="new_releases"
      size="sm"
      v-show="helpersValueFromMaterialSup"
    />
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
    delete materialsSup["helpers"];
  }
  return renameKeys(materialsSup);
}
</script>
<style scoped>
.color-custom {
  color: rgb(31, 73, 125);
}
</style>
