<template>
  <q-dialog v-model="card">
    <q-card>
      <DialogHeader :option="room.rules" @close="card = false" />
      <SectionHoursOfMeet :room="room" />
      <q-separator />
      <SectionHostNameMeet :room="room" />
      <q-separator />
      <SectionHostMeet :room="room" />
      <q-separator />
      <SectionMaterialHelperMeet :eventShow="room" />
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
const props = defineProps({
  eventShow: {
    type: Object,
    required: true,
  },
});

const card = ref(false);
const room = ref(props.eventShow);

watch(
  () => props.eventShow,
  (newEventShow) => {
    room.value = newEventShow;
    card.value = !!newEventShow;
  },
);
</script>

<style scoped>
.color-custom {
  color: rgb(31, 73, 125);
}
</style>
