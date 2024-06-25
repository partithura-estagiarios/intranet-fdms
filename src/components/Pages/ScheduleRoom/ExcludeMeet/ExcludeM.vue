<template>
  <q-item @click="openModal = !openModal" clickable>
    <q-avatar class="bg-red" size="2rem"
      ><q-icon color="white" size="2rem" name="close" />
      <q-tooltip> {{ $t("action.deleteMeet") }} </q-tooltip></q-avatar
    >
    <ModalExcludeEvent
      :confirm="openModal"
      @close="openModal = !openModal"
      @exclude="$emit('exclude')"
    />
  </q-item>
</template>

<script setup lang="ts">
const openModal = ref(false);
</script>
