<template>
  <q-input filled v-model="date" mask="date" hint="Data da Reunião">
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date v-model="date">
            <div class="row items-center justify-end">
              <q-btn
                v-close-popup
                label="Close"
                color="primary"
                flat
                @click="blockDatesFalse(date)"
              />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script setup lang="ts">
import { date as quasarDate } from "quasar";
const emits = defineEmits(["envityDate"]);
const timeStamp = Date.now();
const formattedString = quasarDate.formatDate(timeStamp, "YYYY-MM-DD");
const date = ref(`${formattedString}`);
const receivedInitialTime = ref("");
const receivedFinalTime = ref("");

function blockDatesFalse(dateInput: string) {
  dateInput = quasarDate.formatDate(date.value, "YYYY-MM-DD");
  if (dateInput <= formattedString) {
    return negativeNotify("Data inválida");
  }

  emits("envityDate", dateInput);
}
</script>
