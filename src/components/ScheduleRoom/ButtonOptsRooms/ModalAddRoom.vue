<template>
  <q-dialog v-model="props.addRoom">
    <q-card>
      <DialogHeader option="action.addRoom" />
      <CreateRoomSection />
      <CardButtonConfirm />
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
const props = defineProps({
  addRoom: {
    type: Boolean,
    required: true,
  },
});
const enableModal = ref(props.addRoom);
watchEffect(() => {
  enableModal.value = props.addRoom;
});
</script>
