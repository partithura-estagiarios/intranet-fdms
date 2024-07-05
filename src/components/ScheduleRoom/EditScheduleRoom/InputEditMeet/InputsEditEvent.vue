<template>
  <div class="row">
    <q-input
      v-model="edits.totalPeoples"
      :label="$t('userScheduleRoom.totalPeople')"
      type="number"
      class="q-px-md"
      @update:model-value="edits.totalPeoples = edits.totalPeoples"
    />
    <EditSelectEvent
      :option="edits.location"
      class="custom-q-select q-px-md"
      @envity-new-room="(val) => (edits.location = val)"
    />
    <div class="row q-px-md">
      <InputEditDateTime
        :title="$t('text.startDateAndTime')"
        :label="edits.initialTime"
        @envityDates="(val) => (edits.initialTime = val)"
      />
      <q-space class="q-px-sm" />
      <InputEditDateTime
        :title="$t('text.endDateAndTime')"
        :label="edits.finalTime"
        @envityDates="(val) => (edits.finalTime = val)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatDate } from "../../EditScheduleRoom/InputEditMeet/InputDateTime/lib";

const emits = defineEmits(["envity-edit"]);
const props = defineProps({
  meet: {
    type: Object,
    required: true,
  },
});
const edits = reactive({
  id: props.meet.id,
  totalPeoples: props.meet.totalPeoples,
  location: props.meet.location,
  initialTime: formatDate(props.meet.initialTime),
  finalTime: formatDate(props.meet.finalTime),
});
watchEffect(() => {
  emits("envity-edit", edits);
});
</script>
<style scoped>
.custom-q-select {
  width: 10rem;
}
</style>
