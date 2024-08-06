<template>
  <div class="row justify-between">
    <div class="q-pa-md">
      <q-btn
        class="bg-green text-white q-px-md font-custom"
        :label="$t('text.addRamal')"
        @click="openDialog()"
        v-if="userStorage.getToken"
      />
    </div>
    <q-input
      :label="$t('text.searchRamal')"
      v-model="search"
      color="indigo-8 "
      @keyup.enter="searchRamalInBack()"
    >
      <template v-slot:append>
        <q-icon
          name="search"
          color="indigo-8"
          class="cursor-pointer"
          @click="searchRamalInBack()"
        />
      </template>
    </q-input>
    <DialogAddRamal
      :open="dialogVisible"
      @close="
        (value) => {
          dialogVisible = value;
        }
      "
      @add-ramal="(item: Ramal) => (receivedRamal = item)"
      :option="'addRamal'"
    />
  </div>
</template>
<script setup lang="ts">
import { Ramal } from "../../entities/ramal";

const userStorage = useUsers();
const ramaisStorage = useRamais();
const dialogVisible = ref(false);
const search = ref();
const receivedRamal = ref();

function openDialog() {
  dialogVisible.value = true;
}

async function searchRamalInBack() {
  ramaisStorage.searchRamal(search.value);
}
</script>
<style scoped>
.font-custom {
  font-family: Fira Sans;
}
</style>
