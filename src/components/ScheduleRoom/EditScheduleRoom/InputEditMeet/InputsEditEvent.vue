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
  </div>
</template>

<script setup lang="ts">
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
