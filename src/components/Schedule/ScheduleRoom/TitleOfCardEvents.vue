<template>
  <div class="row">
    <!-- Botão de voltar -->
    <div class="border space-reserved">
      <q-btn
        flat
        icon="arrow_back"
        class="custom-color"
        size="xl"
        v-if="eventStorage.dateOld"
        @click="eventStorage.loadEvents(eventStorage.dateOld)"
      />
    </div>

    <!-- Nome do dia da semana -->
    <div class="border space-reserved-name-week">
      <q-separator color="green" size="0.1rem" />
      <q-chip
        color="transparent"
        class="text-capitalize text-indigo-8 text-h6 font-custom space-reserved-day-name-week"
        >{{ dateFull.weekDay }}</q-chip
      >
      <q-separator color="green" size="0.1rem" />
    </div>

    <!-- Número do dia -->
    <div class="border space-reserved-number">
      <div class="text-h1 custom-color font-custom text-center">
        {{ dateFull.day }}
      </div>
    </div>

    <!-- Nome do mês -->
    <div class="border space-reserved-name-month">
      <q-separator color="green" size="0.1rem" />
      <q-chip
        color="transparent"
        class="text-capitalize text-indigo-8 text-h6 font-custom"
        >{{ dateFull.month }}</q-chip
      >
      <q-separator color="green" size="0.1rem" />
    </div>

    <!-- Botão de avançar -->
    <div class="border space-reserved">
      <q-btn
        flat
        @click="eventStorage.loadEvents(eventStorage.dateNext)"
        icon="arrow_forward"
        clickable
        v-if="eventStorage.dateNext"
        class="custom-color"
        size="xl"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEvents } from "../../../stores/events";
import { reactive, watchEffect } from "vue";

const eventStorage = useEvents();
const dateFull = reactive({
  day: "",
  weekDay: "",
  month: "",
});

watchEffect(() => {
  if (eventStorage.dataFull) {
    const fullDate = eventStorage.getFullData;
    dateFull.day = fullDate.day;
    dateFull.weekDay = fullDate.weekDay;
    dateFull.month = fullDate.month;
  }
});
</script>

<style scoped>
.custom-color {
  color: rgb(31, 73, 125);
}
.font-custom {
  font-family: Fira Sans;
}
.space-reserved {
  width: 5rem;
}
.space-reserved-name-week {
  width: 7rem;
}
.space-reserved-name-month {
  width: 7rem;
}
.space-reserved-day-name-week {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.space-reserved-number {
  width: 7rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
