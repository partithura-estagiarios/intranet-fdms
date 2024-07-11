<template>
  <q-fab color="indigo" push icon="add" direction="right" padding="sm">
    <q-fab-action
      color="indigo"
      @click="addRoomModal = true"
      icon="add_location"
    />
    <ModalAddRoom
      :addRoom="addRoomModal"
      @close="addRoomModal = false"
      @reload="closeModal()"
    />
    <q-fab-action color="indigo" icon="alarm" />
  </q-fab>
</template>

<script setup lang="ts">
const emits = defineEmits(["reloadRoom"]);
const addRoomModal = ref();
function closeModal() {
  addRoomModal.value = false;
  emits("reloadRoom");
}
</script>
