<template>
  <div class="row justify-between">
    <div class="q-pa-md">
      <q-btn
        class="bg-green text-white q-px-md"
        :label="$t('text.addRamal')"
        @click="openDialog()"
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
          $emit('reload');
        }
      "
      @add-ramal="(item: Ramal) => (receivedRamal = item)"
      :option="'addRamal'"
    />
  </div>
</template>
<script setup lang="ts">
import { Ramal } from "../../entities/ramal";
const dialogVisible = ref(false);
const emits = defineEmits(["envityRamal-table", "reload"]);
const search = ref();
const receivedRamal = ref();

function openDialog() {
  dialogVisible.value = true;
}

async function searchRamalInBack() {
  emits("envityRamal-table", search.value);
}
</script>
