<template>
  <q-fab color="indigo" push icon="add" direction="right">
    <q-fab-action
      color="indigo"
      @click="addRoomModal = !addRoomModal"
      icon="add_location"
    />
    <ModalAddRoom :addRoom="addRoomModal" />
    <q-fab-action color="indigo" icon="alarm" />
  </q-fab>
</template>

<script setup lang="ts">
const addRoomModal = ref(false);
</script>
