<template>
  <q-icon
    name="more_vert"
    color="white"
    @click="modalCreateSystem"
    v-if="userStorage.getToken"
    class="position-icon cursor-pointer"
    clickable
  >
    <q-tooltip anchor="center right" self="center left" :offset="[10, 10]">
      {{ $t("action.systemModuleInstitutional") }}
    </q-tooltip>
    <MenuOptsCardSig />
  </q-icon>
</template>
<script setup lang="ts">
import { useUsers } from "../../../stores/user";

const modalCreateSystem = ref();
const userStorage = useUsers();
</script>
<style scoped>
.position-icon {
  bottom: 0.2rem;
}
</style>
